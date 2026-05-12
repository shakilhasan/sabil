import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ExamType } from '../entities/exam.entity';

export class CreateExamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ExamType)
  type: ExamType;

  @IsString()
  @IsNotEmpty()
  semesterId: string;

  @IsString()
  @IsNotEmpty()
  classId: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  totalMarks: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  passingMarks: number;

  @IsOptional()
  @IsString()
  description?: string;
}
