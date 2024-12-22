import { IsIn, IsString } from 'class-validator';
import { USER_ROLE } from '../entity/user-role.entity';

export class SessionTokenDto {
    @IsString()
    email: string;

    @IsIn(USER_ROLE)
    role: (typeof USER_ROLE)[number];
}
