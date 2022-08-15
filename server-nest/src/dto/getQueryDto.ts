import { IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class GetQueryDto {
    @IsOptional()
    id: MongooseSchema.Types.ObjectId;

    @IsOptional()
    current?: number;

    @IsOptional()
    pageSize?: number;
}
