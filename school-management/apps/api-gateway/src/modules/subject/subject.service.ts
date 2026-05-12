import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_ACADEMIC_SERVICE } from '@app/kafka';
import { KafkaTopic, PaginationDto } from '@app/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectGatewayService {
  constructor(
    @Inject(KAFKA_ACADEMIC_SERVICE) private readonly academicClient: ClientKafka,
  ) {}

  async onModuleInit(): Promise<void> {
    Object.values(KafkaTopic)
      .filter((topic) => topic.startsWith('subject.'))
      .forEach((topic) => this.academicClient.subscribeToResponseOf(topic));
    await this.academicClient.connect();
  }

  create(dto: CreateSubjectDto, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.SUBJECT_CREATE, { ...dto, tenantSlug });
  }

  findAll(query: PaginationDto, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.SUBJECT_FIND_ALL, { ...query, tenantSlug });
  }

  findOne(id: string, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.SUBJECT_FIND_ONE, { id, tenantSlug });
  }

  update(id: string, dto: UpdateSubjectDto, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.SUBJECT_UPDATE, { id, ...dto, tenantSlug });
  }

  remove(id: string, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.SUBJECT_DELETE, { id, tenantSlug });
  }
}
