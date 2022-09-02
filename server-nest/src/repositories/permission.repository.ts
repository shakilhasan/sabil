import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { Permission } from '../entities/permission.entity';
import { CreatePermissionDto } from '../modules/permission/dto/createPermission.dto';
import { UpdatePermissionDto } from '../modules/permission/dto/updatePermission.dto';
import mongoose from "mongoose";

export class PermissionRepository {
    constructor(@InjectModel(Permission.name) private readonly permissionModel: Model<Permission>) {}

    async createPermission(createPermissionDto: CreatePermissionDto, session: ClientSession) {
        let permission = new this.permissionModel(createPermissionDto);
        try {
            permission = await permission.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return permission;
    }

    async updatePermission(updatePermission: UpdatePermissionDto, session: ClientSession) {
        const actualDate = new Date();
        actualDate.toUTCString();

        const updateData = {
            updatedAt: actualDate,
        };

        let permission;
        try {
            permission = await this.permissionModel
                .findOneAndUpdate({ _id: updatePermission.id }, updateData, {
                    new: true,
                })
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!permission) {
            throw new ConflictException('Error trying to update permission');
        }

        return permission;
    }

    async getPermissions(payload: GetQueryDto) {
        let limit = payload?.pageSize || 0;
        limit = Number(limit);


        let skip = (payload?.current - 1) * limit || 0;
        skip = Number(skip);

        let permissions: Permission[];

        try {
            if (limit === 0) {
                permissions = await this.permissionModel
                    .find()
                    .populate('client')
                    .populate('user', 'name email')
                    .skip(skip)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                permissions = await this.permissionModel
                    .find()
                    .skip(skip)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (permissions.length > 0) {
                response = {
                    ok: true,
                    total:30,
                    data: permissions,
                    message: 'Get Permissions Ok!',
                };
            } else {
                response = {
                    ok: true,
                    total:0,
                    data: [],
                    message: 'No hay permissions',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getPermissionById(id: MongooseSchema.Types.ObjectId) {
        let permission;
        try {
            permission = await this.permissionModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!permission) {
            throw new NotFoundException('The permission with this id does not exist');
        }

        return permission;
    }

    async searchPermissions(roleId: mongoose.Types.ObjectId) {
        let permissions;
        try {
            // permissions = await this.permissionModel.find({roleId: roleId, isAllowed: true,}).exec();
            permissions = await this.permissionModel.find().exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        return permissions;
    }

    async deletePermission(permissionId: MongooseSchema.Types.ObjectId, session: ClientSession) {
        let permission;
        try {
            permission = await this.permissionModel
                .findOneAndDelete({ _id: permissionId })
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        if (!permission) {
            throw new ConflictException('Error trying to delete permission');
        }
        return permission;
    }
}
