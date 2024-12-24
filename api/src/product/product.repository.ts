import { Prisma } from '@prisma/client';
import { Product } from './entity/product.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_ALREADY_EXISTS_CODE } from './constants/internal-response-codes.constant';
import { SearchProductsQueryDto } from './dto/search-product-query.dto';
import { ApplicationError } from 'src/common/exeptions/aplication-exception.exception';
import { ExceptionCode } from './types/product.type';

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
                throw new ApplicationError<ExceptionCode>(
                    'Product sku already exists',
                    PRODUCT_ALREADY_EXISTS_CODE,
                );
            }
        }
    }

    async getProductsOrderedByPrice() {
        return await this.prisma.product.findMany({
            orderBy: { price: 'asc' },
        });
    }

    async getProductsByEmail(email: string) {
        return await this.prisma.product.findMany({
            where: { user: { email } },
        });
    }

    async search(searchProductsQueryDto: SearchProductsQueryDto) {
        return await this.prisma.product.findMany({
            where: {
                sku: searchProductsQueryDto.sku,
                name: { startsWith: searchProductsQueryDto.name},
                price: {
                    lte: searchProductsQueryDto.maxPrice,
                    gte: searchProductsQueryDto.minPrice,
                },
            },
        });
    }
}
