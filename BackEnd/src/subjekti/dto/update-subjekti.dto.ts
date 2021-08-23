import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjektiDto } from './create-subjekti.dto';

export class UpdateSubjektiDto extends PartialType(CreateSubjektiDto) {}
