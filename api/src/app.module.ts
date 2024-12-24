import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        UserModule,
        ProductModule,
        PrismaModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../..', 'static'),
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
