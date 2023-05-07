import { IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsOptional() firstName: string;
  @IsOptional() lastName: string;
  @IsOptional() city: string;
  @IsOptional() state: string;
  @IsOptional() zip: string;
  @IsOptional() phone: string;
  @IsOptional() email: string;
  @IsOptional() ip: string;
}
