import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { GetAllQueryDto } from './dto/get-all-product-query.dto';
import { ProductRepository } from './product.repository';
import { SearchProductsQueryDto } from './dto/search-product-query.dto';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async create(createProductDto: CreateProductDto, sellerEmail: string) {
        await this.productRepository.create(createProductDto, sellerEmail);
    }

    getAll(getAllQueryDto: GetAllQueryDto) {
        return this.productRepository.getProductsByEmail(getAllQueryDto.sellerEmail);
    }

    getOwn(email: string) {
        return this.productRepository.getProductsByEmail(email);
    }

    search(searchProductsDto: SearchProductsQueryDto) {
        return this.productRepository.search(searchProductsDto);
    }
}
