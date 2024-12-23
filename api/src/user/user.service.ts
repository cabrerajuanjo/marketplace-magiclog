import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { USER_INCORRECT_PASSWORD_CODE } from './constants/internal-response-codes.constant';
import { SessionTokenDto } from './dto/session-token.dto';
import { USER_ROLES_VALUES } from './entity/user-role.entity';
import { ApplicationError } from 'src/common/exeptions/aplication-exception.exception';

@Injectable()
export class UserService {
    constructor(
        private jwtService: JwtService,
        private readonly userRepository: UserRepository,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const SALT_ROUNDS = 10;
        const hashedPassword = await bcrypt.hash(
            createUserDto.password,
            SALT_ROUNDS,
        );
        return await this.userRepository.create({
            email: createUserDto.email,
            role: USER_ROLES_VALUES.USER,
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

        return this.jwtService.sign(tokenPayload);
    }

    async getSellers() {
        return await this.userRepository.getUsersWithProducts();
    }
}
