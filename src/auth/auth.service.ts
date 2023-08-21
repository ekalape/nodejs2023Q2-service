import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthDto } from './dto/signup-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpAuthDto) {
    const user = await this.usersService.findByName(dto.login);
    if (user) throw new ForbiddenException('User already exists');
    return await this.usersService.create(dto);
  }

  async logIn(login: string, password: string) {
    const user = await this.usersService.findByName(login);
    if (!user) throw new ForbiddenException('No user found');

    const isRightPass = await compare(password, user.password);
    if (!isRightPass) throw new ForbiddenException('Wrong password');

    const accessToken = await this.getAccessToken(user.id, login);
    const refreshToken = await this.getRefreshToken(user.id, login);

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    try {
      const validRft = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });
      const { id, login, exp } = validRft;
      const validRefreshToken = exp - Date.now() / 1000;
      if (validRefreshToken < 0) throw new ForbiddenException();

      const accessToken = await this.getAccessToken(id, login);
      const newRefreshToken = await this.getRefreshToken(id, login);

      return { accessToken, newRefreshToken };
    } catch (err) {
      throw new ForbiddenException('Invalid refresh token');
    }
  }

  private async getAccessToken(id: string, login: string) {
    const accessToken = await this.jwtService.signAsync({ id, login });
    return accessToken;
  }
  private async getRefreshToken(id: string, login: string) {
    const refreshToken = await this.jwtService.signAsync(
      { id, login },
      {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      },
    );
    return refreshToken;
  }
}
