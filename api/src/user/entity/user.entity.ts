import { CREATE_USER_ROLE } from './user-role.entity';

export class User {
    email: string;
    password: string;
    role: (typeof CREATE_USER_ROLE)[number];
}
