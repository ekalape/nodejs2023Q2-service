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
import { Public, Refresh } from './publicDecorator';
import { RefreshDto } from './dto/refresh.dto';
/* import { CustomLoggerService } from 'src/customLogger/custom-logger.service'; */
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService /*     private readonly logger: CustomLoggerService, */,
  ) {}

  @Post('signup')
  @Public()
  async signUp(@Body() signUpAuthDto: SignUpAuthDto) {
    return await this.authService.signUp(signUpAuthDto);
  }

  @Post('login')
  @Public()
  async logIn(@Body() loginAuthDto: LoginAuthDto) {
    const { login, password } = loginAuthDto;
    if (!login || !password) {
      /*       this.logger.error('No login or password found'); */
      throw new BadRequestException();
    }
    return await this.authService.logIn(login, password);
  }

  @Post('refresh')
  @Refresh()
  @HttpCode(200)
  async refresh(@Body() refreshDto: RefreshDto) {
    const { refreshToken } = refreshDto;
    if (!refreshToken) {
      /*       this.logger.error('No refresh token found'); */
      throw new UnauthorizedException();
    }
    return this.authService.refresh(refreshToken);
  }
}
