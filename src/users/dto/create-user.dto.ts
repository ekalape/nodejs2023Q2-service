import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Login is too short' })
  login: string;
  @IsNotEmpty()
  @MinLength(3, { message: 'Password is too short' })
  password: string;
}
