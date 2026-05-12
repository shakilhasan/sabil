import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopic } from '@app/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller()
export class TeacherController {
  private readonly logger = new Logger(TeacherController.name);

  constructor(private readonly teacherService: TeacherService) {}

  @MessagePattern(KafkaTopic.TEACHER_CREATE)
  async create(@Payload() payload: CreateTeacherDto) {
    this.logger.log(
      `Received TEACHER_CREATE tenantSlug=${payload.tenantSlug}`,
    );
    return this.teacherService.create(payload.tenantSlug, payload);
  }

  @MessagePattern(KafkaTopic.TEACHER_FIND_ALL)
  async findAll(
    @Payload()
    payload: { tenantSlug: string; page?: number; limit?: number; search?: string },
  ) {
    this.logger.log(
      `Received TEACHER_FIND_ALL tenantSlug=${payload.tenantSlug}`,
    );
    return this.teacherService.findAll(payload.tenantSlug, {
      page: payload.page,
      limit: payload.limit,
      search: payload.search,
    });
  }

  @MessagePattern(KafkaTopic.TEACHER_FIND_ONE)
  async findOne(@Payload() payload: { tenantSlug: string; id: string }) {
    this.logger.log(
      `Received TEACHER_FIND_ONE tenantSlug=${payload.tenantSlug} id=${payload.id}`,
    );
    return this.teacherService.findOne(payload.tenantSlug, payload.id);
  }

  @MessagePattern(KafkaTopic.TEACHER_UPDATE)
  async update(
    @Payload() payload: UpdateTeacherDto & { tenantSlug: string; id: string },
  ) {
    this.logger.log(
      `Received TEACHER_UPDATE tenantSlug=${payload.tenantSlug} id=${payload.id}`,
    );
    return this.teacherService.update(payload.tenantSlug, payload.id, payload);
  }

  @MessagePattern(KafkaTopic.TEACHER_DELETE)
  async remove(@Payload() payload: { tenantSlug: string; id: string }) {
    this.logger.log(
      `Received TEACHER_DELETE tenantSlug=${payload.tenantSlug} id=${payload.id}`,
    );
    return this.teacherService.remove(payload.tenantSlug, payload.id);
  }
}
