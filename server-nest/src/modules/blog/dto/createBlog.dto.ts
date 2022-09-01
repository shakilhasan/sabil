import {IsOptional} from 'class-validator';
import {Schema as MongooseSchema} from 'mongoose';
import {Prop} from "@nestjs/mongoose";
import {User} from "../../../entities/user.entity";

export class CreateBlogDto {
    @IsOptional() id: MongooseSchema.Types.ObjectId;
    @IsOptional() cover: string;
    @IsOptional() title: string;
    @IsOptional() description: string;
    @IsOptional() view: number;
    @IsOptional() comment: number;
    @IsOptional() share: number;
    @IsOptional() favorite: number;
    @IsOptional() author: any;
    @IsOptional() authorId: MongooseSchema.Types.ObjectId;
    @IsOptional() avatarUrl: string;
    @IsOptional() tags: [];
    @IsOptional() body: string;
    @IsOptional() favoritePerson: any;
    @IsOptional() comments: any;
}
