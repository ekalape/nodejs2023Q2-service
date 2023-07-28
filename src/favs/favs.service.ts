import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { albumDB, artistDB, trackDB } from 'src/database/db';
import { FAVSDB } from 'src/database/favsDB';
import { favsEndpoints } from 'src/utils/favsEndpoints';

@Injectable()
export class FavsService {
  constructor(private readonly favsDB: FAVSDB) { }
  async findAll() {
    return {
      artists: this.favsDB.getFavArtist(),
      albums: this.favsDB.getFavAlbums(),
      tracks: this.favsDB.getFavTracks(),
    };
  }

  async findOne(type: string, id: string) {
    let result = null;
    if (type === "artist") result = this.favsDB.findArtist(id);
    if (type === "album") result = this.favsDB.findAlbum(id);
    if (type === "track") result = this.favsDB.findTrack(id);
    return result;
  }

  async addToFavs(subpoint: string, id: string) {
    if (subpoint === favsEndpoints.ARTIST) {
      const artist = artistDB.findbyID(id);
      if (!artist) throw new UnprocessableEntityException();
      const existent = this.favsDB.findArtist(id);
      if (existent)
        throw new NotAcceptableException(
          `This ${subpoint} is already added to the database`,
        );
      this.favsDB.addArtist(artist);
      return artist;
    } else if (subpoint === favsEndpoints.ALBUM) {
      const album = albumDB.findbyID(id);
      if (!album) throw new UnprocessableEntityException();
      const existent = this.favsDB.findAlbum(id);
      if (existent)
        throw new NotAcceptableException(
          `This ${subpoint} is already added to the database`,
        );
      this.favsDB.addAlbum(album);
      return album;
    } else if (subpoint === favsEndpoints.TRACK) {
      const track = trackDB.findbyID(id);
      if (!track) throw new UnprocessableEntityException();
      const existent = this.favsDB.findTrack(id);
      if (existent)
        throw new NotAcceptableException(
          `This ${subpoint} is already added to the database`,
        );
      this.favsDB.addTrack(track);
      return track;
    } else throw new BadRequestException();
  }

  async deleteFromFavs(subpoint: string, id: string) {
    if (subpoint === favsEndpoints.ARTIST) {
      const deleted = this.favsDB.deleteArtist(id);
      if (!deleted) throw new NotFoundException();
    } else if (subpoint === favsEndpoints.ALBUM) {
      const deleted = this.favsDB.deleteAlbum(id);
      if (!deleted) throw new NotFoundException();
    } else if (subpoint === favsEndpoints.TRACK) {
      const deleted = this.favsDB.deleteTrack(id);
      if (!deleted) throw new NotFoundException();
    } else throw new BadRequestException();
  }
}
