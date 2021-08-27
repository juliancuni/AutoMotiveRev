import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('PG_HOST'),
                port: configService.get('PG_PORT'),
                username: configService.get('PG_USER'),
                password: configService.get('PG_PASS'),
                database: configService.get('PG_DB'),
                autoLoadEntities: true,
                synchronize: true,
                logging: true,
            })
        }),
    ]
})
export class DbModule { }
