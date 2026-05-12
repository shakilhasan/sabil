import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Like } from 'typeorm';
import { TenantDatabaseService } from '@app/database';
import { PaginatedResult, PaginationDto } from '@app/common';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  private readonly logger = new Logger(SubjectService.name);

  constructor(
    private readonly tenantDatabaseService: TenantDatabaseService,
  ) {}

  async create(tenantSlug: string, dto: CreateSubjectDto): Promise<Subject> {
    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Subject],
    );
    const repo = dataSource.getRepository(Subject);

    const existing = await repo.findOne({ where: { code: dto.code } });
    if (existing) {
      throw new ConflictException(
        `Subject with code '${dto.code}' already exists`,
      );
    }

    const tenantRecord = await this.tenantDatabaseService['tenantRepository'].findOne({
      where: { slug: tenantSlug },
    });

    const entity = repo.create({
      ...dto,
      tenantId: tenantRecord?.id ?? tenantSlug,
    });

    const saved = await repo.save(entity);
    this.logger.log(`Created subject id=${saved.id} tenantSlug=${tenantSlug}`);
    return saved;
  }

  async findAll(
    tenantSlug: string,
    query: PaginationDto,
  ): Promise<PaginatedResult<Subject>> {
    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Subject],
    );
    const repo = dataSource.getRepository(Subject);

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where = query.search
      ? [
          { name: Like(`%${query.search}%`), isActive: true },
          { code: Like(`%${query.search}%`), isActive: true },
        ]
      : { isActive: true };

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

  async findOne(tenantSlug: string, id: string): Promise<Subject> {
    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Subject],
    );
    const repo = dataSource.getRepository(Subject);

    const entity = await repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Subject with id '${id}' not found`);
    }
    return entity;
  }

  async update(
    tenantSlug: string,
    id: string,
    dto: UpdateSubjectDto,
  ): Promise<Subject> {
    const entity = await this.findOne(tenantSlug, id);

    if (dto.code && dto.code !== entity.code) {
      const dataSource = await this.tenantDatabaseService.getTenantDataSource(
        tenantSlug,
        [Subject],
      );
      const repo = dataSource.getRepository(Subject);
      const conflict = await repo.findOne({ where: { code: dto.code } });
      if (conflict) {
        throw new ConflictException(
          `Subject with code '${dto.code}' already exists`,
        );
      }
    }

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Subject],
    );
    const repo = dataSource.getRepository(Subject);

    Object.assign(entity, dto);
    const updated = await repo.save(entity);
    this.logger.log(`Updated subject id=${id} tenantSlug=${tenantSlug}`);
    return updated;
  }

  async remove(tenantSlug: string, id: string): Promise<Subject> {
    const entity = await this.findOne(tenantSlug, id);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Subject],
    );
    const repo = dataSource.getRepository(Subject);

    entity.isActive = false;
    const deactivated = await repo.save(entity);
    this.logger.log(`Soft-deleted subject id=${id} tenantSlug=${tenantSlug}`);
    return deactivated;
  }
}
