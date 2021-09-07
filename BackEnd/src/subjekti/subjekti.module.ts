import { Module } from '@nestjs/common';
import { SubjektiService } from './subjekti.service';
import { SubjektiController } from './subjekti.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjektiEntity } from './entities/subjekti.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([SubjektiEntity]),
  ],
  controllers: [SubjektiController],
  providers: [SubjektiService,]
})
export class SubjektiModule { }
