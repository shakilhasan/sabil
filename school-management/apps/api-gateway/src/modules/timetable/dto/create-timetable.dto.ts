import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum DayOfWeek {
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
}

export class CreateTimetableDto {
  @ApiProperty({ example: 'uuid-of-class' })
  @IsString()
  @IsNotEmpty()
  classId: string;

  @ApiProperty({ example: 'uuid-of-subject' })
  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @ApiProperty({ example: 'uuid-of-teacher' })
  @IsString()
  @IsNotEmpty()
  teacherId: string;

  @ApiProperty({ example: 'uuid-of-semester' })
  @IsString()
  @IsNotEmpty()
  semesterId: string;

  @ApiProperty({ enum: DayOfWeek, example: DayOfWeek.MON })
  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek;

  @ApiProperty({ example: '08:00', description: 'Start time in HH:mm format' })
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ example: '09:00', description: 'End time in HH:mm format' })
  @IsString()
  @IsNotEmpty()
  endTime: string;

  @ApiPropertyOptional({ example: 'Room 201' })
  @IsOptional()
  @IsString()
  room?: string;
}
