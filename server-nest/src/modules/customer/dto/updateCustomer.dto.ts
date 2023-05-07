import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './createCustomer.dto';
import { IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsOptional() id: MongooseSchema.Types.ObjectId;
}
