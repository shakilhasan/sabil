import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { BlogRepository } from '../../repositories/blog.repository';
import { CreateBlogDto } from './dto/createBlog.dto';
import { UpdateBlogDto } from './dto/updateBlog.dto';

@Injectable()
export class BlogService {
    constructor(private blogRepository: BlogRepository) {}

    async createBlog(createBlogDto: CreateBlogDto, session: ClientSession) {
        return await this.blogRepository.createBlog(createBlogDto, session);
    }

    async getBlogById(blogId: MongooseSchema.Types.ObjectId) {
        return await this.blogRepository.getBlogById(blogId);
    }

    async getBlogs(getQueryDto: GetQueryDto) {
        return await this.blogRepository.getBlogs(getQueryDto);
    }

    async updateBlog(updateBlogDto: UpdateBlogDto, session: ClientSession) {
        return await this.blogRepository.updateBlog(updateBlogDto, session);
    }

    async deleteBlog(blogId: MongooseSchema.Types.ObjectId, session: ClientSession) {
        return await this.blogRepository.deleteBlog(blogId, session);
    }
}
