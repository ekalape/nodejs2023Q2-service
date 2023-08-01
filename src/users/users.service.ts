import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) { }
  async create(createUserDto: CreateUserDto) {

    const user = this.db.user.create({
      data: createUserDto, select: {
        id: true,
        login: true
      }
    })
    return user;

    /*     const { login, password } = createUserDto;
        const existentUser = this.db.usersDB
          .getAll()
          .find((x) => x.login === login);
        if (existentUser) throw new BadRequestException('User already exists');
        const newUser = new User(login, password);
        this.db.usersDB.addOne(newUser);
        return newUser.info(); */
  }

  async findAll() {
    return this.db.user.findMany({
      select: {
        id: true,
        login: true
      }
    })
    /*     const allusers = this.db.usersDB.getAll().map((x) => x.info());
        return allusers; */
  }

  async findOne(id: string) {
    return this.db.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        login: true
      }
    })
    /*     const user = this.db.usersDB.findbyID(id);
        if (!user) return null;
        return user.info(); */
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.db.user.update({
      where: {
        id
      },
      data: updateUserDto,
      select: {
        id: true,
        login: true
      }
    })
    /*     const { oldPassword, newPassword } = updateUserDto;
        const user = this.db.usersDB.findbyID(id);
        if (!user) return null;
        if (user.password !== oldPassword) throw new ForbiddenException();
        user.changePassword(newPassword);
        return user.info(); */
  }

  async remove(id: string) {
    return this.db.user.delete({
      where: {
        id
      },
      select: {
        id: true,
        login: true
      }
    })
    /*     const user = this.db.usersDB.findbyID(id);
        if (!user) return null;
        this.db.usersDB.deleteOne(id);
        return user.info();
      } */
  }
}