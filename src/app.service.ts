import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'There is nothing here for the moment.\nPlease, use endpoints /user or /artist or /album or /track or /favs';
  }
}
