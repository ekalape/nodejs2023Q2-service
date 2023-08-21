import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpAuthDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'Login is too short' })
  @IsString()
  login: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Password is too short' })
  @IsString()
  password: string;
}
