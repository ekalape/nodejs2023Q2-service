import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { favsEndpoints } from 'src/utils/favsEndpoints';

@Injectable()
export class FavsService {
  constructor(private readonly db: DatabaseService) {}
  async findAll() {
    const artistsIds = (await this.db.favsArtist.findMany()).map(
      (x) => x.artistID,
    );
    const albumsIds = (await this.db.favsAlbum.findMany()).map(
      (x) => x.albumID,
    );
    const tracksIds = (await this.db.favsTrack.findMany()).map(
      (x) => x.trackID,
    );

    const artists = await this.db.artist.findMany({
      where: {
        id: { in: artistsIds },
      },
    });
    const albums = await this.db.album.findMany({
      where: {
        id: {
          in: albumsIds,
        },
      },
    });
    const tracks = await this.db.track.findMany({
      where: {
        id: {
          in: tracksIds,
        },
      },
    });
    return {
      artists,
      albums,
      tracks,
    };
  }

  async addToFavs(subpoint: string, id: string) {
    const entity = await this.db[subpoint].findUnique({
      where: { id },
    });
    if (!entity) return null;
    if (subpoint === favsEndpoints.ARTIST) {
      await this.db.favsArtist.create({
        data: { artistID: id },
      });
    } else if (subpoint === favsEndpoints.ALBUM) {
      await this.db.favsAlbum.create({
        data: { albumID: id },
      });
    } else if (subpoint === favsEndpoints.TRACK) {
      await this.db.favsTrack.create({
        data: { trackID: id },
      });
    }
    return entity;
  }

  async deleteFromFavs(subpoint: string, id: string) {
    if (subpoint === favsEndpoints.ARTIST) {
      await this.db.favsArtist.delete({
        where: {
          artistID: id,
        },
      });
    } else if (subpoint === favsEndpoints.ALBUM) {
      await this.db.favsAlbum.delete({
        where: {
          albumID: id,
        },
      });
    } else if (subpoint === favsEndpoints.TRACK) {
      await this.db.favsTrack.delete({
        where: {
          trackID: id,
        },
      });
    } else throw new NotFoundException();
  }
}
