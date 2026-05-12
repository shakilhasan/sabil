import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { TenantDatabaseService } from '@app/database';
import { PaginatedResult, PaginationDto } from '@app/common';
import { ExamResult } from './entities/exam-result.entity';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

/** Derive letter grade from percentage (0-100). */
function computeGrade(percentage: number): string {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 60) return 'C';
  if (percentage >= 50) return 'D';
  return 'F';
}

/** Round a number to 2 decimal places. */
function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

@Injectable()
export class ResultService {
  private readonly logger = new Logger(ResultService.name);

  constructor(
    private readonly tenantDatabaseService: TenantDatabaseService,
  ) {}

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  private async getRepo(tenantSlug: string) {
    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [ExamResult],
    );
    return dataSource.getRepository(ExamResult);
  }

  private async getTenantId(tenantSlug: string): Promise<string> {
    const record = await this.tenantDatabaseService['tenantRepository'].findOne({
      where: { slug: tenantSlug },
    });
    return record?.id ?? tenantSlug;
  }

  // ---------------------------------------------------------------------------
  // Computed fields
  // ---------------------------------------------------------------------------

  private computeFields(
    marksObtained: number,
    totalMarks: number,
    passingMarks: number,
  ): { percentage: number; grade: string; isPassed: boolean } {
    const percentage = round2((marksObtained / totalMarks) * 100);
    const grade = computeGrade(percentage);
    const isPassed = marksObtained >= passingMarks;
    return { percentage, grade, isPassed };
  }

  // ---------------------------------------------------------------------------
  // CRUD
  // ---------------------------------------------------------------------------

  async create(tenantSlug: string, dto: CreateResultDto): Promise<ExamResult> {
    const repo = await this.getRepo(tenantSlug);
    const tenantId = await this.getTenantId(tenantSlug);

    const { percentage, grade, isPassed } = this.computeFields(
      dto.marksObtained,
      dto.totalMarks,
      dto.passingMarks,
    );

    const entity = repo.create({
      tenantId,
      examId: dto.examId,
      studentId: dto.studentId,
      subjectId: dto.subjectId,
      marksObtained: dto.marksObtained,
      totalMarks: dto.totalMarks,
      percentage,
      grade,
      isPassed,
      remarks: dto.remarks,
    });

    const saved = await repo.save(entity);
    this.logger.log(
      `Created result id=${saved.id} student=${saved.studentId} ` +
        `exam=${saved.examId} percentage=${saved.percentage} grade=${saved.grade} tenantSlug=${tenantSlug}`,
    );
    return saved;
  }

  async findAll(
    tenantSlug: string,
    query: PaginationDto & { examId?: string; studentId?: string },
  ): Promise<PaginatedResult<ExamResult>> {
    const repo = await this.getRepo(tenantSlug);

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Partial<ExamResult> = {};
    if (query.examId) where.examId = query.examId;
    if (query.studentId) where.studentId = query.studentId;

    const [data, total] = await repo.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(tenantSlug: string, id: string): Promise<ExamResult> {
    const repo = await this.getRepo(tenantSlug);

    const entity = await repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`ExamResult with id '${id}' not found`);
    }
    return entity;
  }

  async update(
    tenantSlug: string,
    id: string,
    dto: UpdateResultDto,
  ): Promise<ExamResult> {
    const entity = await this.findOne(tenantSlug, id);
    const repo = await this.getRepo(tenantSlug);

    // Apply scalar updates first so computed fields use the latest values.
    if (dto.marksObtained !== undefined) entity.marksObtained = dto.marksObtained;
    if (dto.totalMarks !== undefined) entity.totalMarks = dto.totalMarks;
    if (dto.remarks !== undefined) entity.remarks = dto.remarks;
    if (dto.examId !== undefined) entity.examId = dto.examId;
    if (dto.studentId !== undefined) entity.studentId = dto.studentId;
    if (dto.subjectId !== undefined) entity.subjectId = dto.subjectId;

    // Recompute derived fields.
    const passingMarks =
      dto.passingMarks !== undefined ? dto.passingMarks : entity.marksObtained;
    const { percentage, grade, isPassed } = this.computeFields(
      entity.marksObtained,
      entity.totalMarks,
      passingMarks,
    );
    entity.percentage = percentage;
    entity.grade = grade;
    entity.isPassed = isPassed;

    const updated = await repo.save(entity);
    this.logger.log(
      `Updated result id=${id} percentage=${updated.percentage} grade=${updated.grade} tenantSlug=${tenantSlug}`,
    );
    return updated;
  }

  // ---------------------------------------------------------------------------
  // Rankings
  // ---------------------------------------------------------------------------

  /**
   * Calculate and persist exam rankings for all results belonging to `examId`.
   *
   * Algorithm:
   *  1. Fetch all results for the exam.
   *  2. Sort descending by percentage.
   *  3. Assign rank 1, 2, 3… — ties share the same rank (dense-rank style where
   *     the next rank after a tie skips numbers equal to the tie count).
   *  4. Bulk-update every result's rank column.
   *  5. Return the ranked list sorted by rank ascending.
   */
  async calculateRankings(
    tenantSlug: string,
    examId: string,
  ): Promise<ExamResult[]> {
    const repo = await this.getRepo(tenantSlug);

    const results = await repo.find({ where: { examId } });
    if (results.length === 0) {
      this.logger.warn(`No results found for examId=${examId} tenantSlug=${tenantSlug}`);
      return [];
    }

    // Sort descending by percentage (cast to number — TypeORM returns decimals as strings).
    results.sort(
      (a, b) => Number(b.percentage) - Number(a.percentage),
    );

    // Assign standard competition ranking (1224 style):
    // same percentage → same rank; next distinct percentage gets rank = position + 1.
    let currentRank = 1;
    results.forEach((result, index) => {
      if (index === 0) {
        result.rank = 1;
      } else {
        const prevPercentage = Number(results[index - 1].percentage);
        const currPercentage = Number(result.percentage);
        if (currPercentage === prevPercentage) {
          result.rank = results[index - 1].rank;
        } else {
          result.rank = index + 1;
        }
      }
      currentRank = result.rank;
    });

    // Persist all updates in one batch via save().
    const saved = await repo.save(results);
    this.logger.log(
      `Calculated rankings for examId=${examId} (${saved.length} results) tenantSlug=${tenantSlug}`,
    );

    // Return sorted by rank ascending.
    return saved.sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));
  }
}
