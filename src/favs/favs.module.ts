import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';

@Module({
  imports: [],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
