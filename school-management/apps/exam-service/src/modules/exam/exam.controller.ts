import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopic, PaginationDto } from '@app/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Controller()
export class ExamController {
  private readonly logger = new Logger(ExamController.name);

  constructor(private readonly examService: ExamService) {}

  @MessagePattern(KafkaTopic.EXAM_CREATE)
  async create(
    @Payload() data: { tenantSlug: string; dto: CreateExamDto },
  ) {
    this.logger.log(`Received EXAM_CREATE tenantSlug=${data?.tenantSlug}`);
    return this.examService.create(data.tenantSlug, data.dto);
  }

  @MessagePattern(KafkaTopic.EXAM_FIND_ALL)
  async findAll(
    @Payload() data: {
      tenantSlug: string;
      query: PaginationDto & { classId?: string; semesterId?: string; type?: string };
    },
  ) {
    this.logger.log(`Received EXAM_FIND_ALL tenantSlug=${data?.tenantSlug}`);
    return this.examService.findAll(data.tenantSlug, data.query ?? {});
  }

  @MessagePattern(KafkaTopic.EXAM_FIND_ONE)
  async findOne(
    @Payload() data: { tenantSlug: string; id: string },
  ) {
    this.logger.log(`Received EXAM_FIND_ONE id=${data?.id} tenantSlug=${data?.tenantSlug}`);
    return this.examService.findOne(data.tenantSlug, data.id);
  }

  @MessagePattern(KafkaTopic.EXAM_UPDATE)
  async update(
    @Payload() data: { tenantSlug: string; id: string; dto: UpdateExamDto },
  ) {
    this.logger.log(`Received EXAM_UPDATE id=${data?.id} tenantSlug=${data?.tenantSlug}`);
    return this.examService.update(data.tenantSlug, data.id, data.dto);
  }

  @MessagePattern(KafkaTopic.EXAM_DELETE)
  async remove(
    @Payload() data: { tenantSlug: string; id: string },
  ) {
    this.logger.log(`Received EXAM_DELETE id=${data?.id} tenantSlug=${data?.tenantSlug}`);
    return this.examService.remove(data.tenantSlug, data.id);
  }
}
