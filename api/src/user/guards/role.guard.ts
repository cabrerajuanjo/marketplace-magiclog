import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../types/user.type';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRole = this.reflector.getAllAndOverride<UserRole>(
            'role',
            [context.getHandler(), context.getClass()],
        );
        if (!requiredRole) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRole === user.role;
    }
}
