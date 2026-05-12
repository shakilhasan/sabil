import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_USER_SERVICE } from '@app/kafka';
import { KafkaTopic, PaginationDto } from '@app/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherGatewayService {
  constructor(
    @Inject(KAFKA_USER_SERVICE) private readonly userClient: ClientKafka,
  ) {}

  async onModuleInit(): Promise<void> {
    Object.values(KafkaTopic)
      .filter((topic) => topic.startsWith('teacher.'))
      .forEach((topic) => this.userClient.subscribeToResponseOf(topic));
    await this.userClient.connect();
  }

  create(dto: CreateTeacherDto, tenantSlug: string) {
    return this.userClient.send(KafkaTopic.TEACHER_CREATE, { ...dto, tenantSlug });
  }

  findAll(query: PaginationDto, tenantSlug: string) {
    return this.userClient.send(KafkaTopic.TEACHER_FIND_ALL, { ...query, tenantSlug });
  }

  findOne(id: string, tenantSlug: string) {
    return this.userClient.send(KafkaTopic.TEACHER_FIND_ONE, { id, tenantSlug });
  }

  update(id: string, dto: UpdateTeacherDto, tenantSlug: string) {
    return this.userClient.send(KafkaTopic.TEACHER_UPDATE, { id, ...dto, tenantSlug });
  }

  remove(id: string, tenantSlug: string) {
    return this.userClient.send(KafkaTopic.TEACHER_DELETE, { id, tenantSlug });
  }
}
