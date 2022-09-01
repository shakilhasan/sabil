import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './createPermission.dto';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
