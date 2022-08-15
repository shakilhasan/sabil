import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import {Schema as MongooseSchema} from "mongoose";

export class GetUsersDto {
    @IsOptional()
    id: MongooseSchema.Types.ObjectId;

    @IsOptional()
    current?: number;

    @IsOptional()
    @IsPositive()
    pageSize?: number;
}
