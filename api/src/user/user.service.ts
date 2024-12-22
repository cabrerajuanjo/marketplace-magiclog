import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ApplicationError } from './exception/user-not-found.exception';
import { USER_INCORRECT_PASSWORD_CODE } from './constants/internal-response-codes.constant';
import { TOKEN_EXPIRATION } from './constants/session.constant';
import { SessionTokenDto } from './dto/session-token.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(createUserDto: CreateUserDto) {
        const SALT_ROUNDS = 10;
        const hashedPassword = await bcrypt.hash(
            createUserDto.password,
            SALT_ROUNDS,
        );
        return await this.userRepository.create({
            email: createUserDto.email,
            role: createUserDto.role,
            password: hashedPassword,
        });
    }

    async login(loginDto: LoginDto): Promise<string> {
        const user = await this.userRepository.findUserByEmail(loginDto.email);

        if (!(await bcrypt.compare(loginDto.password, user.password))) {
            throw new ApplicationError(
                'Incorrect password',
                USER_INCORRECT_PASSWORD_CODE,
            );
        }
        const role = user.role;

        const tokenPayload: SessionTokenDto = {
            email: user.email,
            role: role,
        };

        return jwt.sign(tokenPayload, process.env.JWT_SECRET as string, {
            expiresIn: TOKEN_EXPIRATION,
        });
    }
}
