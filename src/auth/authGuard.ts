import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY, REFRESH_KEY } from './publicDecorator';
import { CustomLoggerService } from 'src/customLogger/custom-logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private logger: CustomLoggerService,
  ) {}

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
        const expiredAcT = this.jwtService.decode(token) as {
          [key: string]: any;
        } | null;
        const userName = expiredAcT?.login;
        const rft = request.body?.refreshToken;
        if (!rft) throw new UnauthorizedException('Invalid refresh token');
        try {
          const rftDec = await this.jwtService.verifyAsync(rft, {
            secret: process.env.JWT_SECRET_REFRESH_KEY,
          });
          if (rftDec.login === userName) return true;
        } catch (err) {
          this.logger.error('Refresh token is out of date');
          throw new UnauthorizedException('Invalid refresh token');
        }
      }
      throw new UnauthorizedException();
    }
    return true;
  }
}
