import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, UserEntity])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
