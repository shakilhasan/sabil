import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  section: string;

  @IsString()
  @IsNotEmpty()
  gradeLevel: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  capacity: number;

  @IsOptional()
  @IsString()
  classTeacherId?: string;
}
