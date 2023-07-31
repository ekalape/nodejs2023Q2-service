import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  name: string;
  @ValidateIf((_, value) => value !== null)
  artistId: string | null;
  @ValidateIf((_, value) => value !== null)
  albumId: string | null;
  @IsNumber()
  duration: number;
}
