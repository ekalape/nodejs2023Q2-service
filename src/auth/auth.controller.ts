import { Controller, Post, Body, Param, HttpCode, BadRequestException, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { Public } from './publicDecorator';



@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('signup')
  @Public()
  signUp(@Body() signUpAuthDto: SignUpAuthDto) {
    return this.authService.signUp(signUpAuthDto);
  }



  @Post('login')
  @Public()
  logIn(@Body() loginAuthDto: LoginAuthDto) {
    const { login, password } = loginAuthDto;
    if (!login || !password) throw new BadRequestException()
    return this.authService.logIn(login, password);
  }

  @Post('refresh')
  @Public()
  @HttpCode(200)
  refresh(@Body() loginAuthDto: LoginAuthDto) {
    //return this.authService.refresh(updateAuthDto);
  }


}
