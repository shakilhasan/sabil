import {IsOptional} from 'class-validator';
import {Schema as MongooseSchema} from 'mongoose';
import {Prop} from "@nestjs/mongoose";
import {User} from "../../../entities/user.entity";

export class CreatePermissionDto {
    @IsOptional() id: MongooseSchema.Types.ObjectId;
    @IsOptional() roleId: MongooseSchema.Types.ObjectId;
    @IsOptional() roleName: string;
    @IsOptional() roleAlias: string;
    @IsOptional() resourceId: MongooseSchema.Types.ObjectId;
    @IsOptional() resourceName: string;
    @IsOptional() resourceAlias: string;
    @IsOptional() isAllowed: boolean;
    @IsOptional() isDisabled: boolean;
    @IsOptional() createdBy: MongooseSchema.Types.ObjectId;
    @IsOptional() updatedBy: MongooseSchema.Types.ObjectId;
}
