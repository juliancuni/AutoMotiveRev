import { Module } from '@nestjs/common';
import { DbModule } from './helpers/db/db.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ConfModule } from './helpers/config/conf.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
<<<<<<< HEAD
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
    AuthModule,
    RoleModule,
    MailModule
=======
    ConfModule,
    DbModule,
    UsersModule,
    RolesModule,
    AuthModule,
>>>>>>> backToNest
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
