import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../types/user.type';

export const Roles = (role: UserRole) => SetMetadata('role', role);
