import { Module } from '@nestjs/common';
import { DbModule } from './helpers/db/db.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ConfModule } from './helpers/config/conf.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfModule,
    DbModule,
    UsersModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
