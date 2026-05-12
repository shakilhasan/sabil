import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export enum ExamType {
  MIDTERM = 'MIDTERM',
  FINAL = 'FINAL',
  QUIZ = 'QUIZ',
  ASSIGNMENT = 'ASSIGNMENT',
}

export class CreateExamDto {
  @ApiProperty({ example: 'Midterm Examination — Spring 2024' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: ExamType, example: ExamType.MIDTERM })
  @IsEnum(ExamType)
  type: ExamType;

  @ApiProperty({ example: 'uuid-of-semester' })
  @IsString()
  @IsNotEmpty()
  semesterId: string;

  @ApiProperty({ example: 'uuid-of-class' })
  @IsString()
  @IsNotEmpty()
  classId: string;

  @ApiProperty({ example: '2024-03-01' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2024-03-15' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: 100 })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  totalMarks: number;

  @ApiProperty({ example: 40 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  passingMarks: number;

  @ApiPropertyOptional({ example: 'Covers chapters 1 through 6.' })
  @IsOptional()
  @IsString()
  description?: string;
}
