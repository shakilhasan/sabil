import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Blog, BlogSchema } from '../../entities/blog.entity';
import { BlogRepository } from '../../repositories/blog.repository';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }])],
    controllers: [BlogController],
    providers: [BlogService, BlogRepository],
    exports: [BlogService, BlogRepository],
})
export class BlogModule {}
