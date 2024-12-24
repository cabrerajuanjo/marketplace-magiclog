import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { GetAllQueryDto } from './dto/get-all-product-query.dto';
import { ProductRepository } from './product.repository';
import { SearchProductsQueryDto } from './dto/search-product-query.dto';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    create(createProductDto: CreateProductDto, sellerEmail: string) {
        this.productRepository.create(createProductDto, sellerEmail);
    }

    getAll(getAllQueryDto: GetAllQueryDto) {
        return this.productRepository.getProductsByEmail(
            getAllQueryDto.sellerEmail,
        );
    }

    getOwn(email: string) {
        return this.productRepository.getProductsByEmail(email);
    }

    async getMinMax() {
        const result = await this.productRepository.getProductsOrderedByPrice();
        return {
            smallestPrice: result[0].price,
            highestPrice: result[result.length - 1].price,
        };
    }

    search(searchProductsDto: SearchProductsQueryDto) {
        return this.productRepository.search(searchProductsDto);
    }
}
