import { Module } from '@nestjs/common';
import { SubjektiService } from './subjekti.service';
import { SubjektiController } from './subjekti.controller';

@Module({
  controllers: [SubjektiController],
  providers: [SubjektiService]
})
export class SubjektiModule {}
