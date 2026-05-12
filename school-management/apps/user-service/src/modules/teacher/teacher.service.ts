import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Like } from 'typeorm';
import { TenantDatabaseService } from '@app/database';
import { PaginatedResult } from '@app/common';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

export interface FindAllTeachersQuery {
  page?: number;
  limit?: number;
  search?: string;
}

@Injectable()
export class TeacherService {
  private readonly logger = new Logger(TeacherService.name);

  constructor(private readonly tenantDatabaseService: TenantDatabaseService) {}

  async create(tenantSlug: string, dto: CreateTeacherDto): Promise<Teacher> {
    this.logger.log(
      `Creating teacher employeeId=${dto.employeeId} tenantSlug=${tenantSlug}`,
    );

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Teacher],
    );

    const teacherRepository = dataSource.getRepository(Teacher);

    const existing = await teacherRepository.findOne({
      where: { employeeId: dto.employeeId },
    });
    if (existing) {
      throw new ConflictException(
        `Teacher with employeeId '${dto.employeeId}' already exists`,
      );
    }

    const emailExists = await teacherRepository.findOne({
      where: { email: dto.email },
    });
    if (emailExists) {
      throw new ConflictException(
        `Teacher with email '${dto.email}' already exists`,
      );
    }

    const teacher = teacherRepository.create({
      tenantId: dto.tenantSlug,
      userId: dto.userId,
      employeeId: dto.employeeId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      qualification: dto.qualification,
      designation: dto.designation,
      subjects: dto.subjects ?? [],
      phone: dto.phone,
      address: dto.address,
      profilePhoto: dto.profilePhoto,
      isActive: dto.isActive ?? true,
    });

    const saved = await teacherRepository.save(teacher);
    this.logger.log(`Teacher created id=${saved.id} tenantSlug=${tenantSlug}`);
    return saved;
  }

  async findAll(
    tenantSlug: string,
    query: FindAllTeachersQuery,
  ): Promise<PaginatedResult<Teacher>> {
    this.logger.log(`Finding all teachers tenantSlug=${tenantSlug}`);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Teacher],
    );

    const teacherRepository = dataSource.getRepository(Teacher);

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where = query.search
      ? [
          { firstName: Like(`%${query.search}%`) },
          { lastName: Like(`%${query.search}%`) },
          { employeeId: Like(`%${query.search}%`) },
          { email: Like(`%${query.search}%`) },
          { designation: Like(`%${query.search}%`) },
        ]
      : undefined;

    const [data, total] = await teacherRepository.findAndCount({
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

  async findOne(tenantSlug: string, id: string): Promise<Teacher> {
    this.logger.log(`Finding teacher id=${id} tenantSlug=${tenantSlug}`);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Teacher],
    );

    const teacherRepository = dataSource.getRepository(Teacher);

    const teacher = await teacherRepository.findOne({ where: { id } });
    if (!teacher) {
      throw new NotFoundException(`Teacher with id '${id}' not found`);
    }

    return teacher;
  }

  async update(
    tenantSlug: string,
    id: string,
    dto: UpdateTeacherDto,
  ): Promise<Teacher> {
    this.logger.log(`Updating teacher id=${id} tenantSlug=${tenantSlug}`);

    const teacher = await this.findOne(tenantSlug, id);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Teacher],
    );

    const teacherRepository = dataSource.getRepository(Teacher);

    if (dto.employeeId && dto.employeeId !== teacher.employeeId) {
      const existing = await teacherRepository.findOne({
        where: { employeeId: dto.employeeId },
      });
      if (existing) {
        throw new ConflictException(
          `Teacher with employeeId '${dto.employeeId}' already exists`,
        );
      }
    }

    if (dto.email && dto.email !== teacher.email) {
      const emailExists = await teacherRepository.findOne({
        where: { email: dto.email },
      });
      if (emailExists) {
        throw new ConflictException(
          `Teacher with email '${dto.email}' already exists`,
        );
      }
    }

    Object.assign(teacher, {
      ...(dto.userId !== undefined && { userId: dto.userId }),
      ...(dto.employeeId !== undefined && { employeeId: dto.employeeId }),
      ...(dto.firstName !== undefined && { firstName: dto.firstName }),
      ...(dto.lastName !== undefined && { lastName: dto.lastName }),
      ...(dto.email !== undefined && { email: dto.email }),
      ...(dto.qualification !== undefined && { qualification: dto.qualification }),
      ...(dto.designation !== undefined && { designation: dto.designation }),
      ...(dto.subjects !== undefined && { subjects: dto.subjects }),
      ...(dto.phone !== undefined && { phone: dto.phone }),
      ...(dto.address !== undefined && { address: dto.address }),
      ...(dto.profilePhoto !== undefined && { profilePhoto: dto.profilePhoto }),
      ...(dto.isActive !== undefined && { isActive: dto.isActive }),
    });

    const updated = await teacherRepository.save(teacher);
    this.logger.log(`Teacher updated id=${id} tenantSlug=${tenantSlug}`);
    return updated;
  }

  async remove(tenantSlug: string, id: string): Promise<Teacher> {
    this.logger.log(
      `Soft-deleting teacher id=${id} tenantSlug=${tenantSlug}`,
    );

    const teacher = await this.findOne(tenantSlug, id);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Teacher],
    );

    const teacherRepository = dataSource.getRepository(Teacher);

    teacher.isActive = false;
    const deactivated = await teacherRepository.save(teacher);

    this.logger.log(`Teacher deactivated id=${id} tenantSlug=${tenantSlug}`);
    return deactivated;
  }
}
