import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FAVSDB } from 'src/database/favsDB';

@Module({
  imports: [DatabaseModule],
  controllers: [FavsController],
  providers: [FavsService, FAVSDB],
  exports: [FavsService],
})
export class FavsModule {}
