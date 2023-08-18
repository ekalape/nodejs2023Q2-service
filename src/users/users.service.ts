import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DatabaseService } from 'src/database/database.service';
import { passwordEncryption } from 'src/utils/passwordEncryption';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {

  }
  async create(createUserDto: CreateUserDto) {
    const cryptedPass = await passwordEncryption(createUserDto.password);
    const user = await this.db.user.create({
      data: { ...createUserDto, password: cryptedPass },
    });
    return new User(user);
  }

  async findAll() {
    const resp = await this.db.user.findMany();
    const users = resp.map((u) => new User(u));
    return users;
  }

  async findOne(id: string) {
    const user = await this.db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return null;

    return new User(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { oldPassword, newPassword } = updateUserDto;
    const user = await this.db.user.findUnique({
      where: { id },
    });
    if (!user) return null;

    const isRightPass = await compare(oldPassword, user.password);
    if (!isRightPass) throw new ForbiddenException();
    const newCryptedPass = await passwordEncryption(newPassword);
    const version = user.version + 1;
    const updatedUser = await this.db.user.update({
      where: {
        id,
      },
      data: { password: newCryptedPass, version },
    });
    return new User(updatedUser);
  }

  async remove(id: string) {
    const user = await this.db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return null;
    return await this.db.user.delete({
      where: {
        id,
      },
    });
  }

  async findByName(login: string) {
    return await this.db.user.findFirst({
      where: {
        login,
      },
    });
  }
}
