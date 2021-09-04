import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (confService: ConfigService) => ({
        type: 'postgres',
        host: confService.get('POSTGRES_HOST'),
        port: parseInt(confService.get('POSTGRES_PORT')),
        username: confService.get('POSTGRES_USER'),
        password: confService.get('POSTGRES_PASSWORD'),
        database: confService.get('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
      }),
    }),
  ],
})
export class DbModule {}
