import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopic } from '@app/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller()
export class StudentController {
  private readonly logger = new Logger(StudentController.name);

  constructor(private readonly studentService: StudentService) {}

  @MessagePattern(KafkaTopic.STUDENT_CREATE)
  async create(@Payload() payload: CreateStudentDto) {
    this.logger.log(
      `Received STUDENT_CREATE tenantSlug=${payload.tenantSlug}`,
    );
    return this.studentService.create(payload.tenantSlug, payload);
  }

  @MessagePattern(KafkaTopic.STUDENT_FIND_ALL)
  async findAll(
    @Payload()
    payload: { tenantSlug: string; page?: number; limit?: number; search?: string },
  ) {
    this.logger.log(
      `Received STUDENT_FIND_ALL tenantSlug=${payload.tenantSlug}`,
    );
    return this.studentService.findAll(payload.tenantSlug, {
      page: payload.page,
      limit: payload.limit,
      search: payload.search,
    });
  }

  @MessagePattern(KafkaTopic.STUDENT_FIND_ONE)
  async findOne(@Payload() payload: { tenantSlug: string; id: string }) {
    this.logger.log(
      `Received STUDENT_FIND_ONE tenantSlug=${payload.tenantSlug} id=${payload.id}`,
    );
    return this.studentService.findOne(payload.tenantSlug, payload.id);
  }

  @MessagePattern(KafkaTopic.STUDENT_UPDATE)
  async update(
    @Payload() payload: UpdateStudentDto & { tenantSlug: string; id: string },
  ) {
    this.logger.log(
      `Received STUDENT_UPDATE tenantSlug=${payload.tenantSlug} id=${payload.id}`,
    );
    return this.studentService.update(payload.tenantSlug, payload.id, payload);
  }

  @MessagePattern(KafkaTopic.STUDENT_DELETE)
  async remove(@Payload() payload: { tenantSlug: string; id: string }) {
    this.logger.log(
      `Received STUDENT_DELETE tenantSlug=${payload.tenantSlug} id=${payload.id}`,
    );
    return this.studentService.remove(payload.tenantSlug, payload.id);
  }
}
