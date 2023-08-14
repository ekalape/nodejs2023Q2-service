import { Controller, Post, Body, Param, HttpCode, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { Public } from '@prisma/client/runtime/library';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('signup')
  signUp(@Body() signUpAuthDto: SignUpAuthDto) {
    // return this.authService.signUp(createAuthDto);
  }



  @Post('login')
  logIn(@Body() loginAuthDto: LoginAuthDto) {
    const { login, password } = loginAuthDto;
    if (!login || !password) throw new BadRequestException()
    return this.authService.logIn(login, password);
  }

  @Post('refresh')
  @HttpCode(200)
  refresh(@Body() loginAuthDto: LoginAuthDto) {
    //return this.authService.refresh(updateAuthDto);
  }


}
