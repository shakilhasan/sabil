import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_TENANT_SERVICE } from '@app/kafka';
import { KafkaTopic, PaginationDto } from '@app/common';

@Injectable()
export class TenantGatewayService {
  constructor(
    @Inject(KAFKA_TENANT_SERVICE) private readonly tenantClient: ClientKafka,
  ) {}

  async onModuleInit() {
    Object.values(KafkaTopic)
      .filter((t) => t.startsWith('tenant.'))
      .forEach((topic) => this.tenantClient.subscribeToResponseOf(topic));
    await this.tenantClient.connect();
  }

  create(dto: any) {
    return this.tenantClient.send(KafkaTopic.TENANT_CREATE, dto);
  }

  findAll(query: PaginationDto) {
    return this.tenantClient.send(KafkaTopic.TENANT_FIND_ALL, query);
  }

  findOne(id: string) {
    return this.tenantClient.send(KafkaTopic.TENANT_FIND_ONE, { id });
  }

  update(id: string, dto: any) {
    return this.tenantClient.send(KafkaTopic.TENANT_UPDATE, { id, ...dto });
  }

  remove(id: string) {
    return this.tenantClient.send(KafkaTopic.TENANT_DELETE, { id });
  }
}
