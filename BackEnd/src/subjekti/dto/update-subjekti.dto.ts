import { PartialType } from '@nestjs/swagger';
import { SubjektiDto } from './subjekti.dto';

export class UpdateSubjektiDto extends PartialType(SubjektiDto) {}
