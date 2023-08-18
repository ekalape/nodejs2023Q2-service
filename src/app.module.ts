import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CustomLoggerModule } from './customLogger/custom-logger.module';
import { LoggerMiddleware } from './customLogger/custom-logger.middleware';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CustomLoggerModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
