import { IsEmail, IsIn, IsString } from 'class-validator';
import { CREATE_USER_ROLE } from '../entity/user-role.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsIn(CREATE_USER_ROLE)
  role: (typeof CREATE_USER_ROLE)[number];

  @IsString()
  password: string;
}
