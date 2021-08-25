import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SubjektiEntity } from 'src/subjekti/entities/subjekti.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RoleEntity } from 'src/role/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SubjektiEntity, RoleEntity]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
