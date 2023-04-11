import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationDto } from './createLocation.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {}
