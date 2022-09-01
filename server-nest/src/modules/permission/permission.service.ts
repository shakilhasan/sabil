import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { PermissionRepository } from '../../repositories/permission.repository';
import { CreatePermissionDto } from './dto/createPermission.dto';
import { UpdatePermissionDto } from './dto/updatePermission.dto';

@Injectable()
export class PermissionService {
    constructor(private permissionRepository: PermissionRepository) {}

    async createPermission(createPermissionDto: CreatePermissionDto, session: ClientSession) {
        return await this.permissionRepository.createPermission(createPermissionDto, session);
    }

    async getPermissionById(permissionId: MongooseSchema.Types.ObjectId) {
        return await this.permissionRepository.getPermissionById(permissionId);
    }

    async getPermissions(getQueryDto: GetQueryDto) {
        return await this.permissionRepository.getPermissions(getQueryDto);
    }

    async updatePermission(updatePermissionDto: UpdatePermissionDto, session: ClientSession) {
        return await this.permissionRepository.updatePermission(updatePermissionDto, session);
    }

    async deletePermission(permissionId: MongooseSchema.Types.ObjectId, session: ClientSession) {
        return await this.permissionRepository.deletePermission(permissionId, session);
    }
}
