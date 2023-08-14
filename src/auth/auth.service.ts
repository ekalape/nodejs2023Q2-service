import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService) { }

  signUp(login: string, password: string) {
    return 'This action adds a new auth';
  }


  async logIn(login: string, password: string) {
    const user = await this.usersService.findByName(login)
    if (!user) throw new ForbiddenException("No user found");

    const isRightPass = await compare(password, user.password)
    if (!isRightPass) throw new ForbiddenException("Wrong password");

    const payload = { id: user.id, login: user.login }

    const accessToken = await this.jwtService.signAsync(payload)

    console.log("accesToken===> ", accessToken)
    return { accessToken };
  }

  refresh(login: string, password: string) {
    return `This action updates a  auth`;
  }


}
