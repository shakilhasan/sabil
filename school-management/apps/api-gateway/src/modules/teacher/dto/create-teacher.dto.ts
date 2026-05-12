import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ArrayMinSize,
} from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({ example: 'Alice' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Smith' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'alice.smith@school.edu' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'EMP-2024-042' })
  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @ApiProperty({ example: 'M.Sc. Mathematics' })
  @IsString()
  @IsNotEmpty()
  qualification: string;

  @ApiProperty({ example: 'Senior Teacher' })
  @IsString()
  @IsNotEmpty()
  designation: string;

  @ApiProperty({ example: ['Mathematics', 'Physics'], type: [String] })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  subjects: string[];

  @ApiPropertyOptional({ example: '+1-555-0123' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: '456 Oak Avenue, Springfield' })
  @IsOptional()
  @IsString()
  address?: string;
}
