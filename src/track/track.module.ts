import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FavsModule } from 'src/favs/favs.module';

@Module({
  imports: [FavsModule, DatabaseModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
