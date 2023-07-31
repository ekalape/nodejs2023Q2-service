import { Injectable } from '@nestjs/common';

@Injectable()
export class DBInstance<T extends { id: string }> {
  db: T[];

  constructor() {
    this.db = [];
  }

  getAll() {
    return this.db;
  }
  findbyID(ID: string) {
    return this.db.find((x) => x.id === ID);
  }

  addOne(item: T) {
    this.db.push(item);
  }
  deleteOne(ID: string) {
    const index = this.db.findIndex((x) => x.id === ID);
    this.db.splice(index, 1);
  }
}
