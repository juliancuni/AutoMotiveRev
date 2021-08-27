import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubjektiModule } from '../resources/subjekti/subjekti.module';
import { UserModule } from '../resources/user/user.module';
import { AuthModule } from '../resources/auth/auth.module';
import * as Joi from '@hapi/joi';
import { DbModule } from 'src/utils/db/db.module';
import { RoleModule } from 'src/resources/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PG_HOST: Joi.string().required(),
        PG_PORT: Joi.number().required(),
        PG_USER: Joi.string().required(),
        PG_PASS: Joi.string().required(),
        PG_DB: Joi.string().required(),
        SERVER_PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      })
    }),
    DbModule,
    // SubjektiModule,
    UserModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
