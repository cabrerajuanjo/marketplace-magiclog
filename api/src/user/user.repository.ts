import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from './entity/user.entity';
import {
    USER_ALREADY_EXISTS_CODE,
    USER_NOT_FOUND_CODE,
} from './constants/internal-response-codes.constant';
import { ApplicationError } from 'src/common/exeptions/aplication-exception.exception';

@Injectable()
export class UserRepository {
    @Inject(PrismaService)
    private readonly prisma: PrismaService;

    async create(user: User): Promise<void> {
        try {
            await this.prisma.user.create({ data: user });
        } catch (error) {
            if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
                throw error;
            }
            // TODO: Define P2002 as a constnant somewhere else
            if (error.code === 'P2002') {
                throw new ApplicationError(
                    'User already exists',
                    USER_ALREADY_EXISTS_CODE,
                );
            }
        }
    }

    async findUserByEmail(email: string): Promise<User> {
        try {
            return await this.prisma.user.findFirstOrThrow({
                select: { email: true, password: true, role: true },
                where: { email },
            });
        } catch (error) {
            if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
                throw error;
            }
            // TODO: Define P2025 as a constnant somewhere else
            if (error.code === 'P2025') {
                throw new ApplicationError(
                    'User not found',
                    USER_NOT_FOUND_CODE,
                );
            }
        }
    }

    async getUsersWithProducts() {
        return await this.prisma.user.findMany({
            include: { product: true },
            where: { product: { some: {} } },
        });
    }
}
