import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjektiModule } from './subjekti/subjekti.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(<string>process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.PG_DB,
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
      // "entities":
      //   ["src/**/*.entity.ts", "dist/**/*.entity.js"], "migrations":
      //   ["src/migration/**/*.ts", "dist/migration/**/*.js"], "subscribers":
      //   ["src/subscriber/**/*.ts", "dist/subscriber/**/*.js"],
      // cli: {
      //   entitiesDir: "src",
      //   migrationsDir: "src/migration",
      //   subscribersDir: "src/subscriber"
      // }
    }),
    SubjektiModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
