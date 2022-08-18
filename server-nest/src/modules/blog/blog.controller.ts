import { BadRequestException, UseGuards, Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateBlogDto } from './dto/createBlog.dto';
import { UpdateBlogDto } from './dto/updateBlog.dto';
import { BlogService } from './blog.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/blogs')
export class BlogController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private blogService: BlogService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/create')
    async createBlog(@Body() createBlogDto: CreateBlogDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newBlog: any = await this.blogService.createBlog(createBlogDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newBlog);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/search')
    async getAllBlogs(@Body() getQueryDto: GetQueryDto, @Res() res: any) {
        const storages: any = await this.blogService.getBlogs(getQueryDto);
        return res.status(HttpStatus.OK).send(storages);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/detail/:id')
    async getBlogById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
        const storage: any = await this.blogService.getBlogById(id);
        return res.status(HttpStatus.OK).send(storage);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/updateBlog/:id')
    async updateBlog(@Param('id') id: MongooseSchema.Types.ObjectId, @Body() updateBlogDto: UpdateBlogDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newBlog: any = await this.blogService.updateBlog(updateBlogDto, session);
            await session.commitTransaction();
            return res.status(HttpStatus.OK).send(newBlog);
        } catch (error) {
            await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            session.endSession();
        }
    }
}
