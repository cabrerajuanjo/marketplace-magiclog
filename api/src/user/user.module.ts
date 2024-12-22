import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { TOKEN_EXPIRATION } from './constants/session.constant';
import { RolesGuard } from './guards/role.guard';

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository, AuthGuard, RolesGuard],
    imports: [
        PrismaModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: TOKEN_EXPIRATION },
        }),
    ],
    exports: [AuthGuard, RolesGuard],
})
export class UserModule { }
