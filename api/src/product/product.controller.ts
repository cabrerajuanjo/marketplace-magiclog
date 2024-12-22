import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    HttpException,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApplicationError } from './exception/product-not-found.exception';
import { PRODUCT_ALREADY_EXISTS_CODE } from './constants/internal-response-codes.constant';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { RolesGuard } from 'src/user/guards/role.guard';
import { Roles } from 'src/user/guards/role.decorator';
// import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Roles('user')
    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        try {
            return await this.productService.create(createProductDto);
        } catch (error) {
            if (!(error instanceof ApplicationError)) {
                throw error;
            }
            if (error.code === PRODUCT_ALREADY_EXISTS_CODE) {
                throw new HttpException(
                    'SKU provided was already added',
                    HttpStatus.CONFLICT,
                );
            }
            throw new HttpException(
                'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(+id);
    }

    // @Patch(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updateProductDto: UpdateProductDto,
    // ) {
    //     return this.productService.update(+id, updateProductDto);
    // }
    //
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.productService.remove(+id);
    // }
}
