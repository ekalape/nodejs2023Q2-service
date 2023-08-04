import { Exclude, Transform } from 'class-transformer';

export class User {
  id: string;
  login: string;

  @Exclude()
  password: string;
  version: number;

  @Transform(({ value }) => value.getTime())
  createdAt: Date | number;

  @Transform(({ value }) => value.getTime())
  updatedAt: Date | number;

  constructor(data: {
    id: string, login: string, password: string, version: number,
    createdAt: Date,
    updatedAt: Date
  }) {
    this.id = data.id;
    this.login = data.login;
    this.password = data.password;
    this.version = data.version;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
