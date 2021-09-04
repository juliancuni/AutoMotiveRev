import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (confService: ConfigService) => ({
                secret: confService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: parseInt(confService.get('JWT_EXPIRE')),
                    issuer: confService.get('JWT_ISSUER'),
                    audience: confService.get('JWT_AUD'),
                }
            })
        }),],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, RolesGuard],
    exports: [],
})
export class AuthModule { }
