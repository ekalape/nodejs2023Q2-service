import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(dto: { name: string; year: number; artistId: string | null }) {
    this.id = uuid();
    this.name = dto.name;
    this.year = dto.year;
    this.artistId = dto.artistId;
  }

  update(dto: { name?: string; year?: number; artistId: string | null }) {
    if (!dto.name && !dto.year && !this.artistId)
      throw new BadRequestException();
    if (dto.name) this.name = dto.name;
    if (dto.year) this.year = dto.year;
    if (dto.artistId) this.artistId = dto.artistId;

    return this;
  }
}
