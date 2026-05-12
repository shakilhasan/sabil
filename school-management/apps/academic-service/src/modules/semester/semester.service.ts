import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Like } from 'typeorm';
import { TenantDatabaseService } from '@app/database';
import { PaginatedResult, PaginationDto } from '@app/common';
import { Semester } from './entities/semester.entity';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';

@Injectable()
export class SemesterService {
  private readonly logger = new Logger(SemesterService.name);

  constructor(
    private readonly tenantDatabaseService: TenantDatabaseService,
  ) {}

  async create(tenantSlug: string, dto: CreateSemesterDto): Promise<Semester> {
    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Semester],
    );
    const repo = dataSource.getRepository(Semester);

    const tenantRecord = await this.tenantDatabaseService['tenantRepository'].findOne({
      where: { slug: tenantSlug },
    });

    const entity = repo.create({
      ...dto,
      tenantId: tenantRecord?.id ?? tenantSlug,
    });

    const saved = await repo.save(entity);
    this.logger.log(`Created semester id=${saved.id} tenantSlug=${tenantSlug}`);
    return saved;
  }

  async findAll(
    tenantSlug: string,
    query: PaginationDto,
  ): Promise<PaginatedResult<Semester>> {
    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Semester],
    );
    const repo = dataSource.getRepository(Semester);

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where = query.search
      ? [
          { name: Like(`%${query.search}%`) },
          { academicYear: Like(`%${query.search}%`) },
        ]
      : {};

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

  async findOne(tenantSlug: string, id: string): Promise<Semester> {
    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Semester],
    );
    const repo = dataSource.getRepository(Semester);

    const entity = await repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Semester with id '${id}' not found`);
    }
    return entity;
  }

  async update(
    tenantSlug: string,
    id: string,
    dto: UpdateSemesterDto,
  ): Promise<Semester> {
    const entity = await this.findOne(tenantSlug, id);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Semester],
    );
    const repo = dataSource.getRepository(Semester);

    Object.assign(entity, dto);
    const updated = await repo.save(entity);
    this.logger.log(`Updated semester id=${id} tenantSlug=${tenantSlug}`);
    return updated;
  }

  async remove(tenantSlug: string, id: string): Promise<Semester> {
    const entity = await this.findOne(tenantSlug, id);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Semester],
    );
    const repo = dataSource.getRepository(Semester);

    entity.isActive = false;
    const deactivated = await repo.save(entity);
    this.logger.log(`Soft-deleted semester id=${id} tenantSlug=${tenantSlug}`);
    return deactivated;
  }
}
