import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './publicDecorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const headers = request.headers as Headers & { authorization?: string }

        console.log("req ----> ", request.headers)

        const [type, token] = headers.authorization?.split(' ') ?? [];
        if (type !== 'Bearer' || !token) throw new UnauthorizedException("inside extract")

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET_KEY,
            });
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

}
