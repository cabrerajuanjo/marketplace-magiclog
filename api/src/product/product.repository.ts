import { Prisma } from '@prisma/client';
import { ApplicationError } from './exception/product-not-found.exception';
import { Product } from './entity/product.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_ALREADY_EXISTS_CODE } from './constants/internal-response-codes.constant';
import { GetAllQueryDto } from './dto/get-all-product-query.dto';
import { SearchProductsDto } from './dto/search-product-query.dto';

@Injectable()
export class ProductRepository {
    @Inject(PrismaService)
    private readonly prisma: PrismaService;

    async create(product: Product, sellerEmail: string): Promise<void> {
        try {
            await this.prisma.product.create({
                data: {
                    ...product,
                    user: { connect: { email: sellerEmail } },
                },
            });
        } catch (error) {
            if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
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

    async getAll(getAllQueryDto: GetAllQueryDto) {
        try {
            const { sellerEmail } = getAllQueryDto;
            return await this.prisma.product.findMany({
                where: { user: { email: sellerEmail } },
            });
        } catch (error) {
            throw error;
        }
    }

    getOwn(email: string) {
        return `This action returns a # product`;
    }

    search(searchProductsDto: SearchProductsDto) {
        return `This action returns a # product`;
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
