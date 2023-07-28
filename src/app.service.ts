import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Use endpoints /user or /artist or /album or /track or /favs';
  }
}
