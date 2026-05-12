import { PartialType } from '@nestjs/swagger';
import { CreateSemesterDto } from './create-semester.dto';

export class UpdateSemesterDto extends PartialType(CreateSemesterDto) {}
