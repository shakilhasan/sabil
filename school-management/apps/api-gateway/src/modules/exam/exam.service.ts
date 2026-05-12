import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_EXAM_SERVICE } from '@app/kafka';
import { KafkaTopic, PaginationDto } from '@app/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamGatewayService {
  constructor(
    @Inject(KAFKA_EXAM_SERVICE) private readonly examClient: ClientKafka,
  ) {}

  async onModuleInit(): Promise<void> {
    Object.values(KafkaTopic)
      .filter((topic) => topic.startsWith('exam.'))
      .forEach((topic) => this.examClient.subscribeToResponseOf(topic));
    await this.examClient.connect();
  }

  create(dto: CreateExamDto, tenantSlug: string) {
    return this.examClient.send(KafkaTopic.EXAM_CREATE, { ...dto, tenantSlug });
  }

  findAll(query: PaginationDto, tenantSlug: string) {
    return this.examClient.send(KafkaTopic.EXAM_FIND_ALL, { ...query, tenantSlug });
  }

  findOne(id: string, tenantSlug: string) {
    return this.examClient.send(KafkaTopic.EXAM_FIND_ONE, { id, tenantSlug });
  }

  update(id: string, dto: UpdateExamDto, tenantSlug: string) {
    return this.examClient.send(KafkaTopic.EXAM_UPDATE, { id, ...dto, tenantSlug });
  }

  remove(id: string, tenantSlug: string) {
    return this.examClient.send(KafkaTopic.EXAM_DELETE, { id, tenantSlug });
  }
}
