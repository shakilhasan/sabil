import {IsOptional} from 'class-validator';
import {Schema as MongooseSchema} from 'mongoose';

export class CreateRoleDto {
    @IsOptional() id: MongooseSchema.Types.ObjectId;
    @IsOptional() name: string;
    @IsOptional() title: string;
    @IsOptional() isSuperAdmin: boolean;
    @IsOptional() isAdmin: boolean;
    @IsOptional() alias: string;
    @IsOptional() permissions: MongooseSchema.Types.ObjectId[];
    @IsOptional() createdBy: MongooseSchema.Types.ObjectId;
    @IsOptional() updatedBy: MongooseSchema.Types.ObjectId;
}
