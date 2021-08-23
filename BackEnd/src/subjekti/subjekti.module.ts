import { Module } from '@nestjs/common';
import { SubjektiService } from './subjekti.service';
import { SubjektiController } from './subjekti.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subjekti } from './entities/subjekti.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subjekti])],
  controllers: [SubjektiController],
  providers: [SubjektiService]
})
export class SubjektiModule { }
