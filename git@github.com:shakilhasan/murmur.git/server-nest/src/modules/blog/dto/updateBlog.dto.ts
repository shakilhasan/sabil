import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './createBlog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}
