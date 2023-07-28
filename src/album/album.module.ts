import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FavsModule } from 'src/favs/favs.module';
import { FAVSDB } from 'src/database/favsDB';

@Module({
  imports: [FavsModule, DatabaseModule],
  controllers: [AlbumController],
  providers: [AlbumService, FAVSDB],
})
export class AlbumModule { }
