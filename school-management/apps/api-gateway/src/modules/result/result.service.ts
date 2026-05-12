import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_EXAM_SERVICE } from '@app/kafka';
import { KafkaTopic, PaginationDto } from '@app/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class ResultGatewayService {
  constructor(
    @Inject(KAFKA_EXAM_SERVICE) private readonly examClient: ClientKafka,
  ) {}

  async onModuleInit(): Promise<void> {
    Object.values(KafkaTopic)
      .filter((topic) => topic.startsWith('result.'))
      .forEach((topic) => this.examClient.subscribeToResponseOf(topic));
    await this.examClient.connect();
  }

  create(dto: CreateResultDto, tenantSlug: string) {
    return this.examClient.send(KafkaTopic.RESULT_CREATE, { ...dto, tenantSlug });
  }

  findAll(query: PaginationDto, tenantSlug: string) {
    return this.examClient.send(KafkaTopic.RESULT_FIND_ALL, { ...query, tenantSlug });
  }

  findOne(id: string, tenantSlug: string) {
    return this.examClient.send(KafkaTopic.RESULT_FIND_ONE, { id, tenantSlug });
  }

  update(id: string, dto: UpdateResultDto, tenantSlug: string) {
    return this.examClient.send(KafkaTopic.RESULT_UPDATE, { id, ...dto, tenantSlug });
  }

  remove(id: string, tenantSlug: string) {
    return this.examClient.send(KafkaTopic.RESULT_DELETE, { id, tenantSlug });
  }

  getRankings(examId: string, tenantSlug: string) {
    return this.examClient.send(KafkaTopic.RESULT_RANKINGS, { examId, tenantSlug });
  }
}
