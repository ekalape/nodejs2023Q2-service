import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  oldPassword: string;
  @IsNotEmpty()
  @MinLength(3, { message: 'Login is too short' })
  newPassword: string;
}
