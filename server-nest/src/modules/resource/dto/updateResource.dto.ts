import { PartialType } from '@nestjs/mapped-types';
import { CreateResourceDto } from './createResource.dto';

export class UpdateResourceDto extends PartialType(CreateResourceDto) {}
