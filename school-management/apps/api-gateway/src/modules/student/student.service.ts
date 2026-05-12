import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_USER_SERVICE } from '@app/kafka';
import { KafkaTopic, PaginationDto } from '@app/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentGatewayService {
  constructor(
    @Inject(KAFKA_USER_SERVICE) private readonly userClient: ClientKafka,
  ) {}

  async onModuleInit(): Promise<void> {
    Object.values(KafkaTopic)
      .filter((topic) => topic.startsWith('student.'))
      .forEach((topic) => this.userClient.subscribeToResponseOf(topic));
    await this.userClient.connect();
  }

  create(dto: CreateStudentDto, tenantSlug: string) {
    return this.userClient.send(KafkaTopic.STUDENT_CREATE, { ...dto, tenantSlug });
  }

  findAll(query: PaginationDto, tenantSlug: string) {
    return this.userClient.send(KafkaTopic.STUDENT_FIND_ALL, { ...query, tenantSlug });
  }

  findOne(id: string, tenantSlug: string) {
    return this.userClient.send(KafkaTopic.STUDENT_FIND_ONE, { id, tenantSlug });
  }

  update(id: string, dto: UpdateStudentDto, tenantSlug: string) {
    return this.userClient.send(KafkaTopic.STUDENT_UPDATE, { id, ...dto, tenantSlug });
  }

  remove(id: string, tenantSlug: string) {
    return this.userClient.send(KafkaTopic.STUDENT_DELETE, { id, tenantSlug });
  }
}
