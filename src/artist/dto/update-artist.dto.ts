import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { IsIn, IsString } from 'class-validator';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @IsString()
  name: string;

  @IsIn([true, false])
  grammy: boolean;
}
