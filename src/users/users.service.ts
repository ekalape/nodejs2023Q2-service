import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { usersDB } from 'src/database/db';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const existentUser = usersDB.getAll().find((x) => x.login === login);
    if (existentUser) throw new BadRequestException('User already exists');
    const newUser = new User(login, password);
    usersDB.addOne(newUser);
    return newUser.info();
  }

  findAll() {
    const allusers = usersDB.getAll().map((x) => x.info());
    return allusers;
  }

  findOne(id: string) {
    const user = usersDB.findbyID(id);
    if (!user) throw new NotFoundException();
    return user.info();
    //return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { oldPassword, newPassword } = updateUserDto;
    const user = usersDB.findbyID(id);
    if (!user) throw new NotFoundException();
    if (user.password !== oldPassword) throw new ForbiddenException();
    user.changePassword(newPassword);
    return user.info();
  }

  remove(id: string) {
    const user = usersDB.findbyID(id);
    if (!user) throw new NotFoundException();
    usersDB.deleteOne(id);
    return user.info();
  }
}
