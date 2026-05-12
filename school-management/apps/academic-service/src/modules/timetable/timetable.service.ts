import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { TenantDatabaseService } from '@app/database';
import { PaginatedResult, PaginationDto } from '@app/common';
import { Timetable } from './entities/timetable.entity';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';

@Injectable()
export class TimetableService {
  private readonly logger = new Logger(TimetableService.name);

  constructor(
    private readonly tenantDatabaseService: TenantDatabaseService,
  ) {}

  async create(tenantSlug: string, dto: CreateTimetableDto): Promise<Timetable> {
    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Timetable],
    );
    const repo = dataSource.getRepository(Timetable);

    const tenantRecord = await this.tenantDatabaseService['tenantRepository'].findOne({
      where: { slug: tenantSlug },
    });

    const entity = repo.create({
      ...dto,
      tenantId: tenantRecord?.id ?? tenantSlug,
    });

    const saved = await repo.save(entity);
    this.logger.log(`Created timetable id=${saved.id} tenantSlug=${tenantSlug}`);
    return saved;
  }

  async findAll(
    tenantSlug: string,
    query: PaginationDto & { classId?: string; semesterId?: string },
  ): Promise<PaginatedResult<Timetable>> {
    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Timetable],
    );
    const repo = dataSource.getRepository(Timetable);

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const whereBase: Partial<Timetable> = {};
    if (query.classId) whereBase.classId = query.classId;
    if (query.semesterId) whereBase.semesterId = query.semesterId;

    const [data, total] = await repo.findAndCount({
      where: whereBase,
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

  async findOne(tenantSlug: string, id: string): Promise<Timetable> {
    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Timetable],
    );
    const repo = dataSource.getRepository(Timetable);

    const entity = await repo.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Timetable entry with id '${id}' not found`);
    }
    return entity;
  }

  async update(
    tenantSlug: string,
    id: string,
    dto: UpdateTimetableDto,
  ): Promise<Timetable> {
    const entity = await this.findOne(tenantSlug, id);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Timetable],
    );
    const repo = dataSource.getRepository(Timetable);

    Object.assign(entity, dto);
    const updated = await repo.save(entity);
    this.logger.log(`Updated timetable id=${id} tenantSlug=${tenantSlug}`);
    return updated;
  }

  async remove(tenantSlug: string, id: string): Promise<{ deleted: true; id: string }> {
    const entity = await this.findOne(tenantSlug, id);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Timetable],
    );
    const repo = dataSource.getRepository(Timetable);

    await repo.remove(entity);
    this.logger.log(`Deleted timetable id=${id} tenantSlug=${tenantSlug}`);
    return { deleted: true, id };
  }
}
