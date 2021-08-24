import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SubjektiEntity } from 'src/subjekti/entities/subjekti.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SubjektiEntity])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
