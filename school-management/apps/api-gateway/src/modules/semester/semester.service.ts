import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_ACADEMIC_SERVICE } from '@app/kafka';
import { KafkaTopic, PaginationDto } from '@app/common';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';

@Injectable()
export class SemesterGatewayService {
  constructor(
    @Inject(KAFKA_ACADEMIC_SERVICE) private readonly academicClient: ClientKafka,
  ) {}

  async onModuleInit(): Promise<void> {
    Object.values(KafkaTopic)
      .filter((topic) => topic.startsWith('semester.'))
      .forEach((topic) => this.academicClient.subscribeToResponseOf(topic));
    await this.academicClient.connect();
  }

  create(dto: CreateSemesterDto, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.SEMESTER_CREATE, { ...dto, tenantSlug });
  }

  findAll(query: PaginationDto, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.SEMESTER_FIND_ALL, { ...query, tenantSlug });
  }

  findOne(id: string, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.SEMESTER_FIND_ONE, { id, tenantSlug });
  }

  update(id: string, dto: UpdateSemesterDto, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.SEMESTER_UPDATE, { id, ...dto, tenantSlug });
  }

  remove(id: string, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.SEMESTER_DELETE, { id, tenantSlug });
  }
}
