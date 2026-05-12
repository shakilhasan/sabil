import { PartialType } from '@nestjs/mapped-types';
import { CreateTimetableDto } from './create-timetable.dto';

export class UpdateTimetableDto extends PartialType(CreateTimetableDto) {}
