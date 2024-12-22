import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductRepository } from './product.repository';
import { UserModule } from 'src/user/user.module';

@Module({
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
    imports: [PrismaModule, UserModule],
})
export class ProductModule {}
