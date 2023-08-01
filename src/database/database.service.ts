import { INestApplication, Injectable } from '@nestjs/common';
import { DBInstance } from './db';
import { User } from 'src/users/entities/user.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient {
  /*   usersDB: DBInstance<User>;
    artistDB: DBInstance<Artist>;
    trackDB: DBInstance<Track>;
    albumDB: DBInstance<Album>; */
  constructor() {
    super()
    /*     this.usersDB = new DBInstance<User>();
        this.artistDB = new DBInstance<Artist>();
        this.trackDB = new DBInstance<Track>();
        this.albumDB = new DBInstance<Album>(); */
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect
  }

  /*   async enableShutdownHooks(app: INestApplication) {
      this.$on('beforeExit', async () => {
        await app.close();
      });
    } */
}
