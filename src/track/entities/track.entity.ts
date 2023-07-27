import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export class Track {
  id: string;
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number;

  constructor(dto: {
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
  }) {
    this.id = uuid();
    this.name = dto.name;
    this.artistId = dto.artistId;
    this.albumId = dto.albumId;
    this.duration = dto.duration;
  }
  update(dto: {
    name?: string;
    artistId?: string | null;
    albumId?: string | null;
    duration?: number;
  }) {
    if (!dto.name && !dto.artistId && !dto.albumId && !dto.duration)
      throw new BadRequestException();
    if (dto.name) this.name = dto.name;
    if (dto.albumId) this.albumId = dto.albumId;
    if (dto.artistId) this.artistId = dto.artistId;
    if (dto.duration) this.duration = dto.duration;

    return this;
  }
}
