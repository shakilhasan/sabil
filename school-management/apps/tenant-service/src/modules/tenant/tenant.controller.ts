import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopic } from '@app/common';
import { TenantService, FindAllQuery } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Controller()
export class TenantController {
  private readonly logger = new Logger(TenantController.name);

  constructor(private readonly tenantService: TenantService) {}

  @MessagePattern(KafkaTopic.TENANT_CREATE)
  async create(@Payload() data: CreateTenantDto) {
    this.logger.log(`Received TENANT_CREATE for slug=${data?.slug}`);
    return this.tenantService.create(data);
  }

  @MessagePattern(KafkaTopic.TENANT_FIND_ALL)
  async findAll(@Payload() data: FindAllQuery) {
    this.logger.log(
      `Received TENANT_FIND_ALL page=${data?.page} limit=${data?.limit}`,
    );
    return this.tenantService.findAll(data ?? {});
  }

  @MessagePattern(KafkaTopic.TENANT_FIND_ONE)
  async findOne(@Payload() data: { id: string }) {
    this.logger.log(`Received TENANT_FIND_ONE id=${data?.id}`);
    return this.tenantService.findOne(data.id);
  }

  @MessagePattern(KafkaTopic.TENANT_UPDATE)
  async update(@Payload() data: { id: string } & UpdateTenantDto) {
    const { id, ...dto } = data;
    this.logger.log(`Received TENANT_UPDATE id=${id}`);
    return this.tenantService.update(id, dto);
  }

  @MessagePattern(KafkaTopic.TENANT_DELETE)
  async remove(@Payload() data: { id: string }) {
    this.logger.log(`Received TENANT_DELETE id=${data?.id}`);
    return this.tenantService.remove(data.id);
  }
}
