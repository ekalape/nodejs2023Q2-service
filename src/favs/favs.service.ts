import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

import { FAVSDB } from 'src/database/favsDB';
import { favsEndpoints } from 'src/utils/favsEndpoints';

@Injectable()
export class FavsService {
  constructor(
    private readonly favsDB: FAVSDB,
    private readonly db: DatabaseService,
  ) { }
  async findAll() {
    console.log("first")
    return {
      artists: this.favsDB.getFavArtist(),
      albums: this.favsDB.getFavAlbums(),
      tracks: this.favsDB.getFavTracks(),
    };
  }

  async findOne(type: favsEndpoints, id: string) {
    let result = null;
    if (type === favsEndpoints.ARTIST) result = this.favsDB.findArtist(id);
    if (type === favsEndpoints.ALBUM) result = this.favsDB.findAlbum(id);
    if (type === favsEndpoints.TRACK) result = this.favsDB.findTrack(id);
    return result;
  }

  async addToFavs(subpoint: string, id: string) {
    /*    if (subpoint === favsEndpoints.ARTIST) {
         const artist = this.db.artistDB.findbyID(id);
         if (!artist) throw new UnprocessableEntityException();
         const existent = this.favsDB.findArtist(id);
         if (existent)
           throw new NotAcceptableException(
             `This ${subpoint} is already added to the database`,
           );
         this.favsDB.addArtist(artist);
         return artist;
       } else if (subpoint === favsEndpoints.ALBUM) {
         const album = this.db.albumDB.findbyID(id);
         if (!album) throw new UnprocessableEntityException();
         const existent = this.favsDB.findAlbum(id);
         if (existent)
           throw new NotAcceptableException(
             `This ${subpoint} is already added to the database`,
           );
         this.favsDB.addAlbum(album);
         return album;
       } else if (subpoint === favsEndpoints.TRACK) {
         const track = this.db.trackDB.findbyID(id);
         if (!track) throw new UnprocessableEntityException();
         const existent = this.favsDB.findTrack(id);
         if (existent)
           throw new NotAcceptableException(
             `This ${subpoint} is already added to the database`,
           );
         this.favsDB.addTrack(track);
         return track;
       } else throw new BadRequestException(); */
  }

  async deleteFromFavs(subpoint: favsEndpoints, id: string) {
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
