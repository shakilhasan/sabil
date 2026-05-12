import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_ACADEMIC_SERVICE } from '@app/kafka';
import { KafkaTopic, PaginationDto } from '@app/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassGatewayService {
  constructor(
    @Inject(KAFKA_ACADEMIC_SERVICE) private readonly academicClient: ClientKafka,
  ) {}

  async onModuleInit(): Promise<void> {
    Object.values(KafkaTopic)
      .filter((topic) => topic.startsWith('class.'))
      .forEach((topic) => this.academicClient.subscribeToResponseOf(topic));
    await this.academicClient.connect();
  }

  create(dto: CreateClassDto, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.CLASS_CREATE, { ...dto, tenantSlug });
  }

  findAll(query: PaginationDto, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.CLASS_FIND_ALL, { ...query, tenantSlug });
  }

  findOne(id: string, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.CLASS_FIND_ONE, { id, tenantSlug });
  }

  update(id: string, dto: UpdateClassDto, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.CLASS_UPDATE, { id, ...dto, tenantSlug });
  }

  remove(id: string, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.CLASS_DELETE, { id, tenantSlug });
  }
}
