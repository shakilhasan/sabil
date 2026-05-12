import { PartialType } from '@nestjs/mapped-types';
import { CreateSemesterDto } from './create-semester.dto';

export class UpdateSemesterDto extends PartialType(CreateSemesterDto) {}
