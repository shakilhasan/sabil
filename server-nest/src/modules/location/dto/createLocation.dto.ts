import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  building: string;

  @IsString()
  @IsNotEmpty()
  location_name: string;

  @IsString()
  @IsNotEmpty()
  location_number: string;

  @IsString()
  @IsNotEmpty()
  area: string;
}
