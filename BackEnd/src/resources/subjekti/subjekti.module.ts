import { Module } from '@nestjs/common';
import { SubjektiService } from './subjekti.service';
import { SubjektiController } from './subjekti.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjektiEntity } from './entities/subjekti.entity';
import { UserEntity } from 'src/resources/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubjektiEntity, UserEntity])],
  controllers: [SubjektiController],
  providers: [SubjektiService]
})
export class SubjektiModule { }
