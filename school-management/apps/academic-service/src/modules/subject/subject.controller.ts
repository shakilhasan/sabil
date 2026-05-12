import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopic, PaginationDto } from '@app/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller()
export class SubjectController {
  private readonly logger = new Logger(SubjectController.name);

  constructor(private readonly subjectService: SubjectService) {}

  @MessagePattern(KafkaTopic.SUBJECT_CREATE)
  async create(
    @Payload() data: { tenantSlug: string; dto: CreateSubjectDto },
  ) {
    this.logger.log(`Received SUBJECT_CREATE tenantSlug=${data?.tenantSlug}`);
    return this.subjectService.create(data.tenantSlug, data.dto);
  }

  @MessagePattern(KafkaTopic.SUBJECT_FIND_ALL)
  async findAll(
    @Payload() data: { tenantSlug: string; query: PaginationDto },
  ) {
    this.logger.log(`Received SUBJECT_FIND_ALL tenantSlug=${data?.tenantSlug}`);
    return this.subjectService.findAll(data.tenantSlug, data.query ?? {});
  }

  @MessagePattern(KafkaTopic.SUBJECT_FIND_ONE)
  async findOne(
    @Payload() data: { tenantSlug: string; id: string },
  ) {
    this.logger.log(`Received SUBJECT_FIND_ONE id=${data?.id} tenantSlug=${data?.tenantSlug}`);
    return this.subjectService.findOne(data.tenantSlug, data.id);
  }

  @MessagePattern(KafkaTopic.SUBJECT_UPDATE)
  async update(
    @Payload() data: { tenantSlug: string; id: string; dto: UpdateSubjectDto },
  ) {
    this.logger.log(`Received SUBJECT_UPDATE id=${data?.id} tenantSlug=${data?.tenantSlug}`);
    return this.subjectService.update(data.tenantSlug, data.id, data.dto);
  }

  @MessagePattern(KafkaTopic.SUBJECT_DELETE)
  async remove(
    @Payload() data: { tenantSlug: string; id: string },
  ) {
    this.logger.log(`Received SUBJECT_DELETE id=${data?.id} tenantSlug=${data?.tenantSlug}`);
    return this.subjectService.remove(data.tenantSlug, data.id);
  }
}
