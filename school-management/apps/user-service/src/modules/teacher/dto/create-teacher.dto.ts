import {
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  tenantSlug: string;

  @IsString()
  userId: string;

  @IsString()
  employeeId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  qualification?: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subjects?: string[];

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
