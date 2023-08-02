import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ValidationPipe,
  UsePipes,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.usersService.remove(id);
    if (!user) throw new NotFoundException();
    return user;
  }
}
