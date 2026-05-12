import { PartialType } from '@nestjs/swagger';
import { CreateTimetableDto } from './create-timetable.dto';

export class UpdateTimetableDto extends PartialType(CreateTimetableDto) {}
