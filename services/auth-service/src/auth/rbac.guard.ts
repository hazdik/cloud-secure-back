import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.replace('Bearer ', '');
    if (!token) return false;
    const payload = this.jwtService.decode(token) as any;
    const requiredRole = this.reflector.get<string>('role', context.getHandler());
    return payload?.role && (!requiredRole || payload.role === requiredRole);
  }
}
