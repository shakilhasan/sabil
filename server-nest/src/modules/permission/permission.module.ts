import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Permission, PermissionSchema } from '../../entities/permission.entity';
import { PermissionRepository } from '../../repositories/permission.repository';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }])],
    controllers: [PermissionController],
    providers: [PermissionService, PermissionRepository],
    exports: [PermissionService, PermissionRepository],
})
export class PermissionModule {}
