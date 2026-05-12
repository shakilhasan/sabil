import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { TenantDatabaseService } from '@app/database';
import { PaginatedResult, PaginationDto } from '@app/common';
import { ClassEntity } from './entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Like } from 'typeorm';

@Injectable()
export class ClassService {
  private readonly logger = new Logger(ClassService.name);

  constructor(
    private readonly tenantDatabaseService: TenantDatabaseService,
  ) {}

  async create(tenantSlug: string, dto: CreateClassDto): Promise<ClassEntity> {
    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [ClassEntity],
    );
    const repo = dataSource.getRepository(ClassEntity);

    const tenantRecord = await this.tenantDatabaseService['tenantRepository'].findOne({
      where: { slug: tenantSlug },
    });

    const entity = repo.create({
      ...dto,
      tenantId: tenantRecord?.id ?? tenantSlug,
    });

    const saved = await repo.save(entity);
    this.logger.log(`Created class id=${saved.id} tenantSlug=${tenantSlug}`);
    return saved;
  }

  async findAll(
    tenantSlug: string,
    query: PaginationDto,
  ): Promise<PaginatedResult<ClassEntity>> {
    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [ClassEntity],
    );
    const repo = dataSource.getRepository(ClassEntity);

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where = query.search
      ? [
          { name: Like(`%${query.search}%`), isActive: true },
          { section: Like(`%${query.search}%`), isActive: true },
          { gradeLevel: Like(`%${query.search}%`), isActive: true },
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

  async findOne(tenantSlug: string, id: string): Promise<ClassEntity> {
    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [ClassEntity],
    );
    const repo = dataSource.getRepository(ClassEntity);

    const entity = await repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Class with id '${id}' not found`);
    }
    return entity;
  }

  async update(
    tenantSlug: string,
    id: string,
    dto: UpdateClassDto,
  ): Promise<ClassEntity> {
    const entity = await this.findOne(tenantSlug, id);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [ClassEntity],
    );
    const repo = dataSource.getRepository(ClassEntity);

    Object.assign(entity, dto);
    const updated = await repo.save(entity);
    this.logger.log(`Updated class id=${id} tenantSlug=${tenantSlug}`);
    return updated;
  }

  async remove(tenantSlug: string, id: string): Promise<ClassEntity> {
    const entity = await this.findOne(tenantSlug, id);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [ClassEntity],
    );
    const repo = dataSource.getRepository(ClassEntity);

    entity.isActive = false;
    const deactivated = await repo.save(entity);
    this.logger.log(`Soft-deleted class id=${id} tenantSlug=${tenantSlug}`);
    return deactivated;
  }
}
