import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopic, PaginationDto } from '@app/common';
import { SemesterService } from './semester.service';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';

@Controller()
export class SemesterController {
  private readonly logger = new Logger(SemesterController.name);

  constructor(private readonly semesterService: SemesterService) {}

  @MessagePattern(KafkaTopic.SEMESTER_CREATE)
  async create(
    @Payload() data: { tenantSlug: string; dto: CreateSemesterDto },
  ) {
    this.logger.log(`Received SEMESTER_CREATE tenantSlug=${data?.tenantSlug}`);
    return this.semesterService.create(data.tenantSlug, data.dto);
  }

  @MessagePattern(KafkaTopic.SEMESTER_FIND_ALL)
  async findAll(
    @Payload() data: { tenantSlug: string; query: PaginationDto },
  ) {
    this.logger.log(`Received SEMESTER_FIND_ALL tenantSlug=${data?.tenantSlug}`);
    return this.semesterService.findAll(data.tenantSlug, data.query ?? {});
  }

  @MessagePattern(KafkaTopic.SEMESTER_FIND_ONE)
  async findOne(
    @Payload() data: { tenantSlug: string; id: string },
  ) {
    this.logger.log(`Received SEMESTER_FIND_ONE id=${data?.id} tenantSlug=${data?.tenantSlug}`);
    return this.semesterService.findOne(data.tenantSlug, data.id);
  }

  @MessagePattern(KafkaTopic.SEMESTER_UPDATE)
  async update(
    @Payload() data: { tenantSlug: string; id: string; dto: UpdateSemesterDto },
  ) {
    this.logger.log(`Received SEMESTER_UPDATE id=${data?.id} tenantSlug=${data?.tenantSlug}`);
    return this.semesterService.update(data.tenantSlug, data.id, data.dto);
  }

  @MessagePattern(KafkaTopic.SEMESTER_DELETE)
  async remove(
    @Payload() data: { tenantSlug: string; id: string },
  ) {
    this.logger.log(`Received SEMESTER_DELETE id=${data?.id} tenantSlug=${data?.tenantSlug}`);
    return this.semesterService.remove(data.tenantSlug, data.id);
  }
}
