import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength, Matches } from 'class-validator';
import { SubscriptionPlan } from '@app/common';

export class CreateTenantDto {
  @ApiProperty({ example: 'Greenwood High School' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'greenwood-high', description: 'URL-safe slug, used as subdomain and DB name prefix' })
  @IsString()
  @Matches(/^[a-z0-9-]+$/, { message: 'Slug must be lowercase alphanumeric with hyphens' })
  slug: string;

  @ApiProperty({ example: 'admin@greenwood.edu' })
  @IsEmail()
  adminEmail: string;

  @ApiProperty({ example: 'Admin@123' })
  @IsString()
  @MinLength(6)
  adminPassword: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  adminFirstName: string;

  @ApiProperty({ example: 'Smith' })
  @IsString()
  adminLastName: string;

  @ApiPropertyOptional({ example: 'greenwood.edu' })
  @IsOptional()
  @IsString()
  domain?: string;

  @ApiPropertyOptional({ example: '123 Main St, Springfield' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '+1-555-0100' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ enum: SubscriptionPlan, default: SubscriptionPlan.FREE })
  @IsOptional()
  @IsEnum(SubscriptionPlan)
  plan?: SubscriptionPlan;
}
