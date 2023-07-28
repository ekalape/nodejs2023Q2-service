import { INestApplication, Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  async onModuleInit() {
    //await createDB
  }
  async enableShutdownHooks(app: INestApplication) {
    await app.close();
  }
}
