import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { Role } from '../entities/role.entity';
import { CreateRoleDto } from '../modules/role/dto/createRole.dto';
import { UpdateRoleDto } from '../modules/role/dto/updateRole.dto';

export class RoleRepository {
    constructor(@InjectModel(Role.name) private readonly roleModel: Model<Role>) {}

    async createRole(createRoleDto: CreateRoleDto, session: ClientSession) {
        let role = new this.roleModel(createRoleDto);
        try {
            role = await role.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return role;
    }

    async updateRole(updateRole: UpdateRoleDto, session: ClientSession) {
        const actualDate = new Date();
        actualDate.toUTCString();

        const updateData = {
            updatedAt: actualDate,
        };

        let role;
        try {
            role = await this.roleModel
                .findOneAndUpdate({ _id: updateRole.id }, updateData, {
                    new: true,
                })
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!role) {
            throw new ConflictException('Error trying to update role');
        }

        return role;
    }

    async getRoles(payload: GetQueryDto) {
        let limit = payload?.pageSize || 0;
        limit = Number(limit);


        let skip = (payload?.current - 1) * limit || 0;
        skip = Number(skip);

        let roles: Role[];

        try {
            if (limit === 0) {
                roles = await this.roleModel
                    .find()
                    .populate('client')
                    .populate('user', 'name email')
                    .skip(skip)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                roles = await this.roleModel
                    .find()
                    .skip(skip)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (roles.length > 0) {
                response = {
                    ok: true,
                    total:30,
                    data: roles,
                    message: 'Get Roles Ok!',
                };
            } else {
                response = {
                    ok: true,
                    total:0,
                    data: [],
                    message: 'No hay roles',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getRoleById(id: MongooseSchema.Types.ObjectId) {
        let role;
        try {
            role = await this.roleModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!role) {
            throw new NotFoundException('The role with this id does not exist');
        }

        return role;
    }


    async deleteRole(roleId: MongooseSchema.Types.ObjectId, session: ClientSession) {
        let role;
        try {
            role = await this.roleModel
                .findOneAndDelete({ _id: roleId })
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        if (!role) {
            throw new ConflictException('Error trying to delete role');
        }
        return role;
    }
}
