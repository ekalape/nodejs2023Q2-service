import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { excludeField } from 'src/utils/excludeFields';

import { favsEndpoints } from 'src/utils/favsEndpoints';

@Injectable()
export class FavsService {
  constructor(private readonly db: DatabaseService) {}
  async findAll() {
    const artists = await this.db.artist.findMany({
      where: {
        fav: true,
      },
    });
    const albums = await this.db.album.findMany({
      where: {
        fav: true,
      },
    });
    const tracks = await this.db.track.findMany({
      where: {
        fav: true,
      },
    });
    return {
      artists: artists.map((a) => excludeField(a, ['fav'])),
      albums: albums.map((a) => excludeField(a, ['fav'])),
      tracks: tracks.map((a) => excludeField(a, ['fav'])),
    };
  }

  async addToFavs(subpoint: string, id: string) {
    const entity = await this.db[subpoint].findUnique({
      where: { id },
    });
    if (!entity) return null;
    await this.db[subpoint].update({
      where: { id },
      data: { fav: true },
    });
    return excludeField(entity, ['fav']);
  }

  async deleteFromFavs(subpoint: favsEndpoints, id: string) {
    if (subpoint === favsEndpoints.ARTIST) {
      const entity = await this.db.artist.findUnique({
        where: {
          id,
        },
      });
      if (!entity) throw new NotFoundException();
      await this.db.artist.update({
        where: { id },
        data: { fav: false },
      });
    } else if (subpoint === favsEndpoints.ALBUM) {
      const entity = await this.db.album.findUnique({
        where: {
          id,
        },
      });
      if (!entity) throw new NotFoundException();
      await this.db.album.update({
        where: { id },
        data: { fav: false },
      });
    } else if (subpoint === favsEndpoints.TRACK) {
      const entity = await this.db.track.findUnique({
        where: {
          id,
        },
      });
      if (!entity) throw new NotFoundException();
      await this.db.track.update({
        where: { id },
        data: { fav: false },
      });
    } else throw new BadRequestException();
  }
}
