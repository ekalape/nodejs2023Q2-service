import { IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';

export class CreateTrackDto {
    @IsNotEmpty()
    name: string;
    @ValidateIf((object, value) => value !== null)
    artistId: string | null;
    @ValidateIf((object, value) => value !== null)
    albumId: string | null;
    @IsNotEmpty()
    @IsNumber()
    duration: number;
}
