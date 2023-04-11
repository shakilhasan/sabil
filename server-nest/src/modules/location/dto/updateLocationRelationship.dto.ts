import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationRelationshipDto } from './createLocationRelationship.dto';

export class UpdateLocationRelationshipDto extends PartialType(
  CreateLocationRelationshipDto,
) {}
