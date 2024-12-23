import {
    Controller,
    Post,
    Body,
    HttpStatus,
    HttpException,
    HttpCode,
    Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import {
    USER_ALREADY_EXISTS_CODE,
    USER_INCORRECT_PASSWORD_CODE,
    USER_NOT_FOUND_CODE,
} from './constants/internal-response-codes.constant';
import { ApplicationError } from 'src/common/exeptions/aplication-exception.exception';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            await this.userService.create(createUserDto);
        } catch (error) {
            if (!(error instanceof ApplicationError)) {
                throw error;
            }
            if (error.code === USER_ALREADY_EXISTS_CODE) {
                throw new HttpException(
                    'This email is already associated with an account',
                    HttpStatus.CONFLICT,
                );
            }
            throw new HttpException(
                'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto) {
        try {
            const token = await this.userService.login(loginDto);
            return { sessionToken: token };
        } catch (error) {
            if (!(error instanceof ApplicationError)) {
                throw error;
            }
            if (
                error.code === USER_INCORRECT_PASSWORD_CODE ||
                error.code === USER_NOT_FOUND_CODE
            ) {
                throw new HttpException(
                    'Wrong credentials',
                    HttpStatus.UNAUTHORIZED,
                );
            }
            throw new HttpException(
                'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('sellers')
    @HttpCode(200)
    async getSellers() {
        return await this.userService.getSellers();
    }
}
