// create-cuisine.dto.ts
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCuisineDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  slug: string;
}
