import { IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ValidateIf((_, value) => value !== null)
  artistId: string | null;
}
