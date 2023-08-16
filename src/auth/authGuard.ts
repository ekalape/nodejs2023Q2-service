import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY, REFRESH_KEY } from './publicDecorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const refreshing = this.reflector.getAllAndOverride<boolean>(REFRESH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const headers = request.headers as Headers & { authorization?: string };

    const [type, token] = headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer' || !token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      request['user'] = payload;
    } catch {
      if (refreshing) {
        const expiredAcT = this.jwtService.decode(token) as { [key: string]: any } | null
        const userName = expiredAcT?.login
        const rft = request.body?.refreshToken
        console.log("rft ---> ", rft)
        if (!rft) throw new UnauthorizedException("rft invalid")
        const rftDec = await this.jwtService.verifyAsync(rft, {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        });
        console.log(`rftDec.login = ${rftDec.login} and userName = ${userName}`)
        if (rftDec.login === userName)
          return true;
      }
      throw new UnauthorizedException();
    }
    return true;
  }
}
