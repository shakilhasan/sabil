import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClassDto {
  @ApiProperty({ example: 'Class 10' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A', description: 'Section identifier' })
  @IsString()
  @IsNotEmpty()
  section: string;

  @ApiProperty({ example: '10', description: 'Grade level or year' })
  @IsString()
  @IsNotEmpty()
  gradeLevel: string;

  @ApiProperty({ example: 40, description: 'Maximum number of students' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  capacity: number;

  @ApiPropertyOptional({ example: 'uuid-of-teacher' })
  @IsOptional()
  @IsString()
  classTeacherId?: string;
}
