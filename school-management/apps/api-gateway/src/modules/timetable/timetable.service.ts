import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_ACADEMIC_SERVICE } from '@app/kafka';
import { KafkaTopic, PaginationDto } from '@app/common';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';

@Injectable()
export class TimetableGatewayService {
  constructor(
    @Inject(KAFKA_ACADEMIC_SERVICE) private readonly academicClient: ClientKafka,
  ) {}

  async onModuleInit(): Promise<void> {
    Object.values(KafkaTopic)
      .filter((topic) => topic.startsWith('timetable.'))
      .forEach((topic) => this.academicClient.subscribeToResponseOf(topic));
    await this.academicClient.connect();
  }

  create(dto: CreateTimetableDto, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.TIMETABLE_CREATE, { ...dto, tenantSlug });
  }

  findAll(query: PaginationDto, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.TIMETABLE_FIND_ALL, { ...query, tenantSlug });
  }

  findOne(id: string, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.TIMETABLE_FIND_ONE, { id, tenantSlug });
  }

  update(id: string, dto: UpdateTimetableDto, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.TIMETABLE_UPDATE, { id, ...dto, tenantSlug });
  }

  remove(id: string, tenantSlug: string) {
    return this.academicClient.send(KafkaTopic.TIMETABLE_DELETE, { id, tenantSlug });
  }
}
