import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}
  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const existentUser = this.db.usersDB
      .getAll()
      .find((x) => x.login === login);
    if (existentUser) throw new BadRequestException('User already exists');
    const newUser = new User(login, password);
    this.db.usersDB.addOne(newUser);
    return newUser.info();
  }

  async findAll() {
    const allusers = this.db.usersDB.getAll().map((x) => x.info());
    return allusers;
  }

  async findOne(id: string) {
    const user = this.db.usersDB.findbyID(id);
    if (!user) throw new NotFoundException();
    return user.info();
    //return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { oldPassword, newPassword } = updateUserDto;
    const user = this.db.usersDB.findbyID(id);
    if (!user) throw new NotFoundException();
    if (user.password !== oldPassword) throw new ForbiddenException();
    user.changePassword(newPassword);
    return user.info();
  }

  async remove(id: string) {
    const user = this.db.usersDB.findbyID(id);
    if (!user) throw new NotFoundException();
    this.db.usersDB.deleteOne(id);
    return user.info();
  }
}
