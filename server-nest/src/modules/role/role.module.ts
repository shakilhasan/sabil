import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Role, RoleSchema } from '../../entities/role.entity';
import { RoleRepository } from '../../repositories/role.repository';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])],
    controllers: [RoleController],
    providers: [RoleService, RoleRepository],
    exports: [RoleService, RoleRepository],
})
export class RoleModule {}
