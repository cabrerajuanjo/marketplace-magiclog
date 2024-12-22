import { Prisma } from '@prisma/client';
import { ApplicationError } from './exception/product-not-found.exception';
import { Product } from './entity/product.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_ALREADY_EXISTS_CODE } from './constants/internal-response-codes.constant';

@Injectable()
export class ProductRepository {
    @Inject(PrismaService)
    private readonly prisma: PrismaService;

    async create(product: Product): Promise<void> {
        try {
            const { sellerId, ...productData } = product;
            await this.prisma.product.create({
                data: {
                    ...productData,
                    user: { connect: { id: sellerId } },
                },
            });
        } catch (error) {
            if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
                console.error(error);
                throw error;
            }
            // TODO: Define P2002 as a constnant somewhere else
            if (error.code === 'P2002') {
                throw new ApplicationError(
                    'Product sku already exists',
                    PRODUCT_ALREADY_EXISTS_CODE,
                );
            }
        }
    }

    // async findUserByEmail(email: string): Promise<User> {
    //     try {
    //         return await this.prisma.user.findFirstOrThrow({
    //             select: { email: true, password: true, role: true },
    //             where: { email },
    //         });
    //     } catch (error) {
    //         if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    //             throw error;
    //         }
    //         // TODO: Define P2025 as a constnant somewhere else
    //         if (error.code === 'P2025') {
    //             throw new ApplicationError(
    //                 'User not found',
    //                 USER_NOT_FOUND_CODE,
    //             );
    //         }
    //     }
    // }
}
