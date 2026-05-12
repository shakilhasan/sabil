import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Like } from 'typeorm';
import { TenantDatabaseService } from '@app/database';
import { PaginatedResult, PaginationDto } from '@app/common';
import { Exam } from './entities/exam.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamService {
  private readonly logger = new Logger(ExamService.name);

  constructor(
    private readonly tenantDatabaseService: TenantDatabaseService,
  ) {}

  async create(tenantSlug: string, dto: CreateExamDto): Promise<Exam> {
    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Exam],
    );
    const repo = dataSource.getRepository(Exam);

    const tenantRecord = await this.tenantDatabaseService['tenantRepository'].findOne({
      where: { slug: tenantSlug },
    });

    const entity = repo.create({
      ...dto,
      tenantId: tenantRecord?.id ?? tenantSlug,
    });

    const saved = await repo.save(entity);
    this.logger.log(`Created exam id=${saved.id} tenantSlug=${tenantSlug}`);
    return saved;
  }

  async findAll(
    tenantSlug: string,
    query: PaginationDto & { classId?: string; semesterId?: string; type?: string },
  ): Promise<PaginatedResult<Exam>> {
    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Exam],
    );
    const repo = dataSource.getRepository(Exam);

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    let whereConditions: any = {};

    if (query.classId) whereConditions.classId = query.classId;
    if (query.semesterId) whereConditions.semesterId = query.semesterId;
    if (query.type) whereConditions.type = query.type;

    const where = query.search
      ? [
          { ...whereConditions, name: Like(`%${query.search}%`) },
        ]
      : whereConditions;

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

  async findOne(tenantSlug: string, id: string): Promise<Exam> {
    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Exam],
    );
    const repo = dataSource.getRepository(Exam);

    const entity = await repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Exam with id '${id}' not found`);
    }
    return entity;
  }

  async update(
    tenantSlug: string,
    id: string,
    dto: UpdateExamDto,
  ): Promise<Exam> {
    const entity = await this.findOne(tenantSlug, id);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Exam],
    );
    const repo = dataSource.getRepository(Exam);

    Object.assign(entity, dto);
    const updated = await repo.save(entity);
    this.logger.log(`Updated exam id=${id} tenantSlug=${tenantSlug}`);
    return updated;
  }

  async remove(tenantSlug: string, id: string): Promise<Exam> {
    const entity = await this.findOne(tenantSlug, id);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Exam],
    );
    const repo = dataSource.getRepository(Exam);

    await repo.remove(entity);
    this.logger.log(`Deleted exam id=${id} tenantSlug=${tenantSlug}`);
    return entity;
  }

  async publishExam(tenantSlug: string, id: string): Promise<Exam> {
    const entity = await this.findOne(tenantSlug, id);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Exam],
    );
    const repo = dataSource.getRepository(Exam);

    entity.isPublished = true;
    const published = await repo.save(entity);
    this.logger.log(`Published exam id=${id} tenantSlug=${tenantSlug}`);
    return published;
  }
}
