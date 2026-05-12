import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopic, PaginationDto } from '@app/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Controller()
export class ResultController {
  private readonly logger = new Logger(ResultController.name);

  constructor(private readonly resultService: ResultService) {}

  @MessagePattern(KafkaTopic.RESULT_CREATE)
  async create(
    @Payload() data: { tenantSlug: string; dto: CreateResultDto },
  ) {
    this.logger.log(`Received RESULT_CREATE tenantSlug=${data?.tenantSlug}`);
    return this.resultService.create(data.tenantSlug, data.dto);
  }

  @MessagePattern(KafkaTopic.RESULT_FIND_ALL)
  async findAll(
    @Payload() data: {
      tenantSlug: string;
      query: PaginationDto & { examId?: string; studentId?: string };
    },
  ) {
    this.logger.log(`Received RESULT_FIND_ALL tenantSlug=${data?.tenantSlug}`);
    return this.resultService.findAll(data.tenantSlug, data.query ?? {});
  }

  @MessagePattern(KafkaTopic.RESULT_FIND_ONE)
  async findOne(
    @Payload() data: { tenantSlug: string; id: string },
  ) {
    this.logger.log(`Received RESULT_FIND_ONE id=${data?.id} tenantSlug=${data?.tenantSlug}`);
    return this.resultService.findOne(data.tenantSlug, data.id);
  }

  @MessagePattern(KafkaTopic.RESULT_UPDATE)
  async update(
    @Payload() data: { tenantSlug: string; id: string; dto: UpdateResultDto },
  ) {
    this.logger.log(`Received RESULT_UPDATE id=${data?.id} tenantSlug=${data?.tenantSlug}`);
    return this.resultService.update(data.tenantSlug, data.id, data.dto);
  }

  @MessagePattern(KafkaTopic.RESULT_RANKINGS)
  async calculateRankings(
    @Payload() data: { tenantSlug: string; examId: string },
  ) {
    this.logger.log(
      `Received RESULT_RANKINGS examId=${data?.examId} tenantSlug=${data?.tenantSlug}`,
    );
    return this.resultService.calculateRankings(data.tenantSlug, data.examId);
  }
}
