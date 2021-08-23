import { PartialType } from '@nestjs/mapped-types';
import { SubjektiDto } from './subjekti.dto';

export class UpdateSubjektiDto extends PartialType(SubjektiDto) {}
