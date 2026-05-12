import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Like } from 'typeorm';
import { TenantDatabaseService } from '@app/database';
import { PaginatedResult } from '@app/common';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

export interface FindAllStudentsQuery {
  page?: number;
  limit?: number;
  search?: string;
}

@Injectable()
export class StudentService {
  private readonly logger = new Logger(StudentService.name);

  constructor(private readonly tenantDatabaseService: TenantDatabaseService) {}

  async create(tenantSlug: string, dto: CreateStudentDto): Promise<Student> {
    this.logger.log(
      `Creating student admissionNumber=${dto.admissionNumber} tenantSlug=${tenantSlug}`,
    );

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Student],
    );

    const studentRepository = dataSource.getRepository(Student);

    const existing = await studentRepository.findOne({
      where: { admissionNumber: dto.admissionNumber },
    });
    if (existing) {
      throw new ConflictException(
        `Student with admissionNumber '${dto.admissionNumber}' already exists`,
      );
    }

    const student = studentRepository.create({
      tenantId: dto.tenantSlug,
      userId: dto.userId,
      admissionNumber: dto.admissionNumber,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
      gender: dto.gender,
      gradeLevel: dto.gradeLevel,
      classId: dto.classId,
      parentName: dto.parentName,
      parentPhone: dto.parentPhone,
      parentEmail: dto.parentEmail,
      address: dto.address,
      profilePhoto: dto.profilePhoto,
      isActive: dto.isActive ?? true,
    });

    const saved = await studentRepository.save(student);
    this.logger.log(`Student created id=${saved.id} tenantSlug=${tenantSlug}`);
    return saved;
  }

  async findAll(
    tenantSlug: string,
    query: FindAllStudentsQuery,
  ): Promise<PaginatedResult<Student>> {
    this.logger.log(`Finding all students tenantSlug=${tenantSlug}`);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Student],
    );

    const studentRepository = dataSource.getRepository(Student);

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where = query.search
      ? [
          { firstName: Like(`%${query.search}%`) },
          { lastName: Like(`%${query.search}%`) },
          { admissionNumber: Like(`%${query.search}%`) },
          { email: Like(`%${query.search}%`) },
        ]
      : undefined;

    const [data, total] = await studentRepository.findAndCount({
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

  async findOne(tenantSlug: string, id: string): Promise<Student> {
    this.logger.log(`Finding student id=${id} tenantSlug=${tenantSlug}`);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Student],
    );

    const studentRepository = dataSource.getRepository(Student);

    const student = await studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student with id '${id}' not found`);
    }

    return student;
  }

  async update(
    tenantSlug: string,
    id: string,
    dto: UpdateStudentDto,
  ): Promise<Student> {
    this.logger.log(`Updating student id=${id} tenantSlug=${tenantSlug}`);

    const student = await this.findOne(tenantSlug, id);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Student],
    );

    const studentRepository = dataSource.getRepository(Student);

    if (dto.admissionNumber && dto.admissionNumber !== student.admissionNumber) {
      const existing = await studentRepository.findOne({
        where: { admissionNumber: dto.admissionNumber },
      });
      if (existing) {
        throw new ConflictException(
          `Student with admissionNumber '${dto.admissionNumber}' already exists`,
        );
      }
    }

    Object.assign(student, {
      ...(dto.userId !== undefined && { userId: dto.userId }),
      ...(dto.admissionNumber !== undefined && { admissionNumber: dto.admissionNumber }),
      ...(dto.firstName !== undefined && { firstName: dto.firstName }),
      ...(dto.lastName !== undefined && { lastName: dto.lastName }),
      ...(dto.email !== undefined && { email: dto.email }),
      ...(dto.dateOfBirth !== undefined && { dateOfBirth: new Date(dto.dateOfBirth) }),
      ...(dto.gender !== undefined && { gender: dto.gender }),
      ...(dto.gradeLevel !== undefined && { gradeLevel: dto.gradeLevel }),
      ...(dto.classId !== undefined && { classId: dto.classId }),
      ...(dto.parentName !== undefined && { parentName: dto.parentName }),
      ...(dto.parentPhone !== undefined && { parentPhone: dto.parentPhone }),
      ...(dto.parentEmail !== undefined && { parentEmail: dto.parentEmail }),
      ...(dto.address !== undefined && { address: dto.address }),
      ...(dto.profilePhoto !== undefined && { profilePhoto: dto.profilePhoto }),
      ...(dto.isActive !== undefined && { isActive: dto.isActive }),
    });

    const updated = await studentRepository.save(student);
    this.logger.log(`Student updated id=${id} tenantSlug=${tenantSlug}`);
    return updated;
  }

  async remove(tenantSlug: string, id: string): Promise<Student> {
    this.logger.log(
      `Soft-deleting student id=${id} tenantSlug=${tenantSlug}`,
    );

    const student = await this.findOne(tenantSlug, id);

    const dataSource = await this.tenantDatabaseService.getTenantDataSource(
      tenantSlug,
      [Student],
    );

    const studentRepository = dataSource.getRepository(Student);

    student.isActive = false;
    const deactivated = await studentRepository.save(student);

    this.logger.log(`Student deactivated id=${id} tenantSlug=${tenantSlug}`);
    return deactivated;
  }
}
