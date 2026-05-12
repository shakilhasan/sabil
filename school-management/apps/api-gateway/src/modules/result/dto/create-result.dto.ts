import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateResultDto {
  @ApiProperty({ example: 'uuid-of-exam' })
  @IsString()
  @IsNotEmpty()
  examId: string;

  @ApiProperty({ example: 'uuid-of-student' })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ example: 'uuid-of-subject' })
  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @ApiProperty({ example: 78, description: 'Marks obtained by the student' })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  marksObtained: number;

  @ApiProperty({ example: 100, description: 'Total marks for this subject/exam' })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  totalMarks: number;

  @ApiPropertyOptional({ example: 'Good performance, needs improvement in algebra.' })
  @IsOptional()
  @IsString()
  remarks?: string;
}
