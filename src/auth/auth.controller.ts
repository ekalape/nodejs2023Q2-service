import {
  Controller,
  Post,
  Body,
  HttpCode,
  BadRequestException,
  ClassSerializerInterceptor,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { Public } from './publicDecorator';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  async signUp(@Body() signUpAuthDto: SignUpAuthDto) {
    return await this.authService.signUp(signUpAuthDto);
  }

  @Post('login')
  @Public()
  async logIn(@Body() loginAuthDto: LoginAuthDto) {
    const { login, password } = loginAuthDto;
    if (!login || !password) throw new BadRequestException();
    return await this.authService.logIn(login, password);
  }

  @Post('refresh')
  @Public()
  @HttpCode(200)
  async refresh(@Body() refreshDto: RefreshDto) {
    const { refreshToken } = refreshDto;
    if (!refreshToken) throw new UnauthorizedException();

    return this.authService.refresh(refreshToken);
  }
}
