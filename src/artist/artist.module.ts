import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FavsModule } from 'src/favs/favs.module';
import { FAVSDB } from 'src/database/favsDB';

@Module({
  imports: [FavsModule, DatabaseModule],
  controllers: [ArtistController],
  providers: [ArtistService, FAVSDB],
})
export class ArtistModule { }
