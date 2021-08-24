import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SubjektiEntity } from 'src/subjekti/entities/subjekti.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SubjektiEntity]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
