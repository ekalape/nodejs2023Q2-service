import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export class Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(name: string, grammy: boolean) {
    this.id = uuid();
    this.name = name;
    this.grammy = grammy;
  }

  update(dto: { name?: string; grammy?: boolean }) {
    if (!dto.name || typeof dto.grammy !== 'boolean')
      throw new BadRequestException();
    if (dto.name) this.name = dto.name;
    if (typeof dto.grammy === 'boolean') this.grammy = dto.grammy;

    return this;
  }
}
