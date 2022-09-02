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
import { CreateRoleDto } from './dto/createRole.dto';
import { UpdateRoleDto } from './dto/updateRole.dto';
import { RoleService } from './role.service';
import { AuthGuard } from '@nestjs/passport';
import {Roles} from "../auth/roles.decorator";
import {RoleEnum} from "../auth/role.enum";
import { RolesGuard } from '../auth/guards/roles.guard';
import {Role} from "../../entities/role.entity";

@UseGuards(RolesGuard)
@Controller('api/roles')
export class RoleController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private roleService: RoleService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    async createRole(@Body() createRoleDto: CreateRoleDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newRole: any = await this.roleService.createRole(createRoleDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newRole);
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
    async getAllRoles(@Body() getQueryDto: GetQueryDto, @Res() res: any) {
        const storages: any = await this.roleService.getRoles(getQueryDto);
        return res.status(HttpStatus.OK).send(storages);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/detail')
    async getRoleById(@Query() query: Role, @Res() res: Response) {
        const storage: any = await this.roleService.getRoleById(query?.id);
        return res.status(HttpStatus.OK).send(storage);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/update')
    async updateRole(@Body() updateRoleDto: UpdateRoleDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newRole: any = await this.roleService.updateRole(updateRoleDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newRole);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete')
    async deleteRole(@Query() query: Role, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const deletedRole: any = await this.roleService.deleteRole(query.id, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(deletedRole);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }
}
