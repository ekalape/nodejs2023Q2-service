import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { usersDB } from 'src/database/db';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const newUser = new User(login, password)
    usersDB.addOne(newUser)
    return newUser.info();
  }

  findAll() {
    const allusers = usersDB.getAll().map(x => x.info())
    return allusers;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
