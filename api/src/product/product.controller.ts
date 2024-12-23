import {
    Controller,
    Get,
    Post,
    Body,
    HttpException,
    HttpStatus,
    UseGuards,
    Req,
    RawBodyRequest,
    Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PRODUCT_ALREADY_EXISTS_CODE } from './constants/internal-response-codes.constant';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { RolesGuard } from 'src/user/guards/role.guard';
import { Roles } from 'src/user/guards/role.decorator';
import { SessionPayload } from 'src/common/types/session.type';
import { GetAllQueryDto } from './dto/get-all-product-query.dto';
import { SearchProductsQueryDto } from './dto/search-product-query.dto';
import { ApplicationError } from 'src/common/exeptions/aplication-exception.exception';

@UseGuards(AuthGuard, RolesGuard)
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Roles('user')
    @Post()
    async create(
        @Body() createProductDto: CreateProductDto,
        @Req() req: RawBodyRequest<Request & SessionPayload>,
    ) {
        try {
            const { user } = req;
            return await this.productService.create(
                createProductDto,
                user.email,
            );
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

    @Roles('admin')
    @Get('all')
    getAll(@Query() getAllQueryDto: GetAllQueryDto) {
        return this.productService.getAll(getAllQueryDto);
    }

    @Roles('user')
    @Get('mine')
    getOwn(@Req() req: RawBodyRequest<Request & SessionPayload>) {
        const { user } = req;
        return this.productService.getOwn(user.email);
    }

    @Roles('user')
    @Get('search')
    searchProducts(@Query() searchProductsDto: SearchProductsQueryDto) {
        return this.productService.search(searchProductsDto);
    }
}
