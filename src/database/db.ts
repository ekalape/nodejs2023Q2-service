import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
class DBInstance<T extends { id: string }> {
  db: T[];

  constructor() {
    this.db = [];
  }

  getAll() {
    return this.db;
  }
  findbyID(ID: string) {
    return this.db.find((x) => x.id === ID);
  }

  addOne(item: T) {
    this.db.push(item);
  }
  deleteOne(ID: string) {
    const index = this.db.findIndex((x) => x.id === ID);
    this.db.splice(index, 1);
  }
}

export const usersDB = new DBInstance<User>();
export const artistDB = new DBInstance<Artist>();
export const trackDB = new DBInstance<Track>();
export const albumDB = new DBInstance<Album>();
