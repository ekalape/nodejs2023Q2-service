import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { albumDB, artistDB, trackDB } from 'src/database/db';
import { favsDB } from 'src/database/favsDB';
import { favsEndpoints } from 'src/utils/favsEndpoints';

@Injectable()
export class FavsService {
  async findAll() {
    return {
      artists: favsDB.getFavArtist(),
      albums: favsDB.getFavAlbums(),
      tracks: favsDB.getFavTracks(),
    };
  }

  async addToFavs(subpoint: string, id: string) {
    if (subpoint === favsEndpoints.ARTIST) {
      const artist = artistDB.findbyID(id);
      if (!artist) throw new UnprocessableEntityException();
      const existent = favsDB.findArtist(id);
      if (existent)
        throw new NotAcceptableException(
          `This ${subpoint} is already added to the database`,
        );
      favsDB.addArtist(artist);
      return artist;
    } else if (subpoint === favsEndpoints.ALBUM) {
      const album = albumDB.findbyID(id);
      if (!album) throw new UnprocessableEntityException();
      const existent = favsDB.findAlbum(id);
      if (existent)
        throw new NotAcceptableException(
          `This ${subpoint} is already added to the database`,
        );
      favsDB.addAlbum(album);
      return album;
    } else if (subpoint === favsEndpoints.TRACK) {
      const track = trackDB.findbyID(id);
      if (!track) throw new UnprocessableEntityException();
      const existent = favsDB.findTrack(id);
      if (existent)
        throw new NotAcceptableException(
          `This ${subpoint} is already added to the database`,
        );
      favsDB.addTrack(track);
      return track;
    } else throw new BadRequestException();
  }

  async deleteFromFavs(subpoint: string, id: string) {
    if (subpoint === favsEndpoints.ARTIST) {
      const deleted = favsDB.deleteArtist(id);
      if (!deleted) throw new NotFoundException();
    } else if (subpoint === favsEndpoints.ALBUM) {
      const deleted = favsDB.deleteAlbum(id);
      if (!deleted) throw new NotFoundException();
    } else if (subpoint === favsEndpoints.TRACK) {
      const deleted = favsDB.deleteTrack(id);
      if (!deleted) throw new NotFoundException();
    } else throw new BadRequestException();
  }
}
