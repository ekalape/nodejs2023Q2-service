import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DatabaseService } from 'src/database/database.service';
import { excludeField } from 'src/utils/excludeFields';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.db.user.create({
      data: createUserDto,
    });
    const crAt = user.createdAt.getTime();
    const upAt = user.updatedAt.getTime();
    const mappedUser: User = { ...user, createdAt: crAt, updatedAt: upAt };
    return excludeField(mappedUser, ['password']);
  }

  async findAll() {
    return await this.db.user.findMany({ select: { id: true, login: true } });
  }

  async findOne(id: string) {
    const user = await this.db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return null;
    return excludeField(user, ['password']);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { oldPassword, newPassword } = updateUserDto;
    const user = await this.db.user.findUnique({
      where: { id },
    });
    if (!user) return null;
    if (user.password !== oldPassword) throw new ForbiddenException();
    const version = user.version + 1;
    const updatedUser = await this.db.user.update({
      where: {
        id,
      },
      data: { password: newPassword, version },
    });
    const crAt = updatedUser.createdAt.getTime();
    const upAt = updatedUser.updatedAt.getTime();
    const mappedUser: User = {
      ...updatedUser,
      createdAt: crAt,
      updatedAt: upAt,
    };
    return excludeField(mappedUser, ['password']);
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
}
