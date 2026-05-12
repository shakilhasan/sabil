import { PartialType } from '@nestjs/swagger';
import { CreateResultDto } from './create-result.dto';

export class UpdateResultDto extends PartialType(CreateResultDto) {}
