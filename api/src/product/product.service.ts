import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { GetAllQueryDto } from './dto/get-all-product-query.dto';
import { ProductRepository } from './product.repository';
import { SearchProductsDto } from './dto/search-product-query.dto';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async create(createProductDto: CreateProductDto, sellerEmail: string) {
        await this.productRepository.create(createProductDto, sellerEmail);
    }

    getAll(getAllQueryDto: GetAllQueryDto) {
        return this.productRepository.getAll(getAllQueryDto);
    }

    getOwn(email: string) {
        return `This action returns a # product`;
    }

    search(searchProductsDto: SearchProductsDto) {
        return `This action returns a # product`;
    }
}
