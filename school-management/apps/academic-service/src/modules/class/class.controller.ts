import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopic, PaginationDto } from '@app/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Controller()
export class ClassController {
  private readonly logger = new Logger(ClassController.name);

  constructor(private readonly classService: ClassService) {}

  @MessagePattern(KafkaTopic.CLASS_CREATE)
  async create(
    @Payload() data: { tenantSlug: string; dto: CreateClassDto },
  ) {
    this.logger.log(`Received CLASS_CREATE tenantSlug=${data?.tenantSlug}`);
    return this.classService.create(data.tenantSlug, data.dto);
  }

  @MessagePattern(KafkaTopic.CLASS_FIND_ALL)
  async findAll(
    @Payload() data: { tenantSlug: string; query: PaginationDto },
  ) {
    this.logger.log(`Received CLASS_FIND_ALL tenantSlug=${data?.tenantSlug}`);
    return this.classService.findAll(data.tenantSlug, data.query ?? {});
  }

  @MessagePattern(KafkaTopic.CLASS_FIND_ONE)
  async findOne(
    @Payload() data: { tenantSlug: string; id: string },
  ) {
    this.logger.log(`Received CLASS_FIND_ONE id=${data?.id} tenantSlug=${data?.tenantSlug}`);
    return this.classService.findOne(data.tenantSlug, data.id);
  }

  @MessagePattern(KafkaTopic.CLASS_UPDATE)
  async update(
    @Payload() data: { tenantSlug: string; id: string; dto: UpdateClassDto },
  ) {
    this.logger.log(`Received CLASS_UPDATE id=${data?.id} tenantSlug=${data?.tenantSlug}`);
    return this.classService.update(data.tenantSlug, data.id, data.dto);
  }

  @MessagePattern(KafkaTopic.CLASS_DELETE)
  async remove(
    @Payload() data: { tenantSlug: string; id: string },
  ) {
    this.logger.log(`Received CLASS_DELETE id=${data?.id} tenantSlug=${data?.tenantSlug}`);
    return this.classService.remove(data.tenantSlug, data.id);
  }
}
