import {
    BadRequestException,
    UseGuards,
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Res,
    Delete
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreatePermissionDto } from './dto/createPermission.dto';
import { UpdatePermissionDto } from './dto/updatePermission.dto';
import { PermissionService } from './permission.service';
import { AuthGuard } from '@nestjs/passport';
import {Roles} from "../auth/roles.decorator";
import {RoleEnum} from "../auth/role.enum";
import { RolesGuard } from '../auth/guards/roles.guard';
import {Permission} from "../../entities/permission.entity";

@UseGuards(RolesGuard)
@Controller('api/permissions')
export class PermissionController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private permissionService: PermissionService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    async createPermission(@Body() createPermissionDto: CreatePermissionDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newPermission: any = await this.permissionService.createPermission(createPermissionDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newPermission);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles(RoleEnum.SuperAdmin)
    // @Roles(Role.Admin)
    @Post('/search')
    async getAllPermissions(@Body() getQueryDto: GetQueryDto, @Res() res: any) {
        const storages: any = await this.permissionService.getPermissions(getQueryDto);
        return res.status(HttpStatus.OK).send(storages);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/detail')
    async getPermissionById(@Query() query: Permission, @Res() res: Response) {
        const storage: any = await this.permissionService.getPermissionById(query?.id);
        return res.status(HttpStatus.OK).send(storage);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/update')
    async updatePermission(@Body() updatePermissionDto: UpdatePermissionDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newPermission: any = await this.permissionService.updatePermission(updatePermissionDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newPermission);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete')
    async deletePermission(@Query() query: Permission, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const deletedPermission: any = await this.permissionService.deletePermission(query.id, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(deletedPermission);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }
}
