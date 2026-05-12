import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopic, PaginationDto } from '@app/common';
import { TimetableService } from './timetable.service';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';

@Controller()
export class TimetableController {
  private readonly logger = new Logger(TimetableController.name);

  constructor(private readonly timetableService: TimetableService) {}

  @MessagePattern(KafkaTopic.TIMETABLE_CREATE)
  async create(
    @Payload() data: { tenantSlug: string; dto: CreateTimetableDto },
  ) {
    this.logger.log(`Received TIMETABLE_CREATE tenantSlug=${data?.tenantSlug}`);
    return this.timetableService.create(data.tenantSlug, data.dto);
  }

  @MessagePattern(KafkaTopic.TIMETABLE_FIND_ALL)
  async findAll(
    @Payload() data: { tenantSlug: string; query: PaginationDto & { classId?: string; semesterId?: string } },
  ) {
    this.logger.log(`Received TIMETABLE_FIND_ALL tenantSlug=${data?.tenantSlug}`);
    return this.timetableService.findAll(data.tenantSlug, data.query ?? {});
  }

  @MessagePattern(KafkaTopic.TIMETABLE_FIND_ONE)
  async findOne(
    @Payload() data: { tenantSlug: string; id: string },
  ) {
    this.logger.log(`Received TIMETABLE_FIND_ONE id=${data?.id} tenantSlug=${data?.tenantSlug}`);
    return this.timetableService.findOne(data.tenantSlug, data.id);
  }

  @MessagePattern(KafkaTopic.TIMETABLE_UPDATE)
  async update(
    @Payload() data: { tenantSlug: string; id: string; dto: UpdateTimetableDto },
  ) {
    this.logger.log(`Received TIMETABLE_UPDATE id=${data?.id} tenantSlug=${data?.tenantSlug}`);
    return this.timetableService.update(data.tenantSlug, data.id, data.dto);
  }

  @MessagePattern(KafkaTopic.TIMETABLE_DELETE)
  async remove(
    @Payload() data: { tenantSlug: string; id: string },
  ) {
    this.logger.log(`Received TIMETABLE_DELETE id=${data?.id} tenantSlug=${data?.tenantSlug}`);
    return this.timetableService.remove(data.tenantSlug, data.id);
  }
}
