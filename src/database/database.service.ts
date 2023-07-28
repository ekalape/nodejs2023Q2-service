import { INestApplication, Injectable } from '@nestjs/common';
import { DBInstance } from './db';
import { User } from 'src/users/entities/user.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

@Injectable()
export class DatabaseService {
  usersDB: DBInstance<User>;
  artistDB: DBInstance<Artist>;
  trackDB: DBInstance<Track>;
  albumDB: DBInstance<Album>;
  constructor() {
    this.usersDB = new DBInstance<User>();
    this.artistDB = new DBInstance<Artist>();
    this.trackDB = new DBInstance<Track>();
    this.albumDB = new DBInstance<Album>();
  }

  async onModuleInit() {
    //await createDB
  }
  async enableShutdownHooks(app: INestApplication) {
    await app.close();
  }
}
