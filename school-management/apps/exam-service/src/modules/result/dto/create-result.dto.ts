import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateResultDto {
  @IsString()
  @IsNotEmpty()
  examId: string;

  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  marksObtained: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  totalMarks: number;

  /**
   * The passing-marks threshold used to determine isPassed.
   * Typically sourced from the parent Exam record.
   */
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  passingMarks: number;

  @IsOptional()
  @IsString()
  remarks?: string;
}
