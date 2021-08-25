import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SubjektiEntity } from 'src/subjekti/entities/subjekti.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RoleEntity } from 'src/role/entities/role.entity';
import { ResetPassEntity } from './entities/reset-pass.entity';
import { ResetPassService } from './services/reset-pass.service';
import { ResetPassController } from './controllers/reset-pass.controller';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SubjektiEntity, RoleEntity, ResetPassEntity]),
    AuthModule,
    MailModule,
  ],
  controllers: [UserController, ResetPassController],
  providers: [UserService, ResetPassService],
  exports: [UserService],
})
export class UserModule { }
