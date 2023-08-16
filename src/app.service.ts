import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `This is the main page of the app.\n
    Please, use endpoints /signup or /login and after successful sign-in you will have access to /user or /artist or /album or /track or /favs or /refresh endpoints`;
  }
}
