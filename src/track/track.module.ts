import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FavsModule } from 'src/favs/favs.module';
import { FAVSDB } from 'src/database/favsDB';

@Module({
  imports: [FavsModule],
  controllers: [TrackController],
  providers: [TrackService, FAVSDB],
})
export class TrackModule { }
