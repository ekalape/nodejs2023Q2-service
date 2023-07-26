import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ValidationPipe, UsePipes, BadRequestException, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { usersDB } from 'src/database/db';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UsePipes(new ValidationPipe)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const { login } = createUserDto;
    const existentUser = usersDB.getAll().find(x => x.login === login)
    if (existentUser) throw new ForbiddenException("User already exists")
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
