import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLocationRelationshipDto {
  @IsNumber()
  @IsNotEmpty()
  ancestor_id: number;

  @IsNumber()
  @IsNotEmpty()
  descendant_id: number;

  @IsNumber()
  @IsNotEmpty()
  distance: number;
}
