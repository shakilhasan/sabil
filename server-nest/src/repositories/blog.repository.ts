import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { Blog } from '../entities/blog.entity';
import { CreateBlogDto } from '../modules/blog/dto/createBlog.dto';
import { UpdateBlogDto } from '../modules/blog/dto/updateBlog.dto';

export class BlogRepository {
    constructor(@InjectModel(Blog.name) private readonly blogModel: Model<Blog>) {}

    async createBlog(createBlogDto: CreateBlogDto, session: ClientSession) {
        let blog = new this.blogModel(createBlogDto);
        try {
            blog = await blog.save({ session });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return blog;
    }

    async updateBlog(updateBlog: UpdateBlogDto, session: ClientSession) {
        const actualDate = new Date();
        actualDate.toUTCString();

        const updateData = {
            updatedAt: actualDate,
        };

        let blog;
        try {
            blog = await this.blogModel
                .findOneAndUpdate({ _id: updateBlog.id }, updateData, {
                    new: true,
                })
                .session(session)
                .exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!blog) {
            throw new ConflictException('Error trying to update blog');
        }

        return blog;
    }

    async getBlogs(payload: GetQueryDto) {
        let limit = payload?.pageSize || 0;
        limit = Number(limit);


        let skip = (payload?.current - 1) * limit || 0;
        skip = Number(skip);

        let blogs: Blog[];

        try {
            if (limit === 0) {
                blogs = await this.blogModel
                    .find()
                    .populate('client')
                    .populate('user', 'name email')
                    .skip(skip)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                blogs = await this.blogModel
                    .find()
                    .skip(skip)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (blogs.length > 0) {
                response = {
                    ok: true,
                    data: blogs,
                    message: 'Get Blogs Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No hay blogs',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getBlogById(id: MongooseSchema.Types.ObjectId) {
        let blog;
        try {
            blog = await this.blogModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!blog) {
            throw new NotFoundException('The blog with this id does not exist');
        }

        return blog;
    }
}
