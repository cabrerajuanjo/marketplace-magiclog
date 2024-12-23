import { UserRole } from 'src/user/types/user.type';

export type SessionPayload = {
    user: {
        email: string;
        role: UserRole;
        iat: number;
        exp: number;
    };
};
