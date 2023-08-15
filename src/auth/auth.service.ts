import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthDto } from './dto/signup-auth.dto';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService) { }

  async signUp(dto: SignUpAuthDto) {
    const user = await this.usersService.findByName(dto.login)
    if (user) throw new ForbiddenException("User already exists");
    return await this.usersService.create(dto)
  }


  async logIn(login: string, password: string) {
    const user = await this.usersService.findByName(login)
    if (!user) throw new ForbiddenException("No user found");

    const isRightPass = await compare(password, user.password)
    if (!isRightPass) throw new ForbiddenException("Wrong password");

    const accessToken = await this.getAccessToken(user.id, login)
    const refreshToken = await this.getRefreshToken(user.id, login)

    console.log("accesToken===> ", accessToken)
    return { accessToken, refreshToken };
  }

  refresh(login: string, password: string) {
    return `This action updates a  auth`;
  }

  private async getAccessToken(id: string, login: string) {
    const accessToken = await this.jwtService.signAsync({ id, login })
    return "Bearer " + accessToken
  }
  private async getRefreshToken(id: string, login: string) {
    const refreshToken = await this.jwtService.signAsync({ id, login }, { expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME })
    return "Bearer " + refreshToken
  }


}
