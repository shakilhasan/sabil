import {IsOptional} from 'class-validator';
import {Schema as MongooseSchema} from 'mongoose';

export class CreateResourceDto {
    @IsOptional() id: MongooseSchema.Types.ObjectId;
    @IsOptional() name: string;
    @IsOptional() alias: string;
    @IsOptional() type: string;
    @IsOptional() createdBy: MongooseSchema.Types.ObjectId;
    @IsOptional() updatedBy: MongooseSchema.Types.ObjectId;
}
