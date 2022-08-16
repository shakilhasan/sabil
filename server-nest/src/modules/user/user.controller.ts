import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Query, Post, Res } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
// @ts-ignore
import {User} from "../../entities/user.entity";

@Controller('api/users')
export class UserController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private userService: UserService) {}

    @Post('/create')
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newUser: any = await this.userService.createUser(createUserDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.CREATED).send(newUser);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            console.log('finally-----------',createUserDto);
            session.endSession();
        }
    }

    @Get('/detail')
    async getCompanyById(@Query() query: User, @Res() res: Response) {
        const user: any = await this.userService.getUserById(query?.id);
        return res.status(HttpStatus.OK).send(user);
    }
}
