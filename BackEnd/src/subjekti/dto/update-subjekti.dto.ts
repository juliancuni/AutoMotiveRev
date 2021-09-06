import { PartialType } from '@nestjs/swagger';
import { CreateSubjektiDto } from './create-subjekti.dto';

export class UpdateSubjektiDto extends PartialType(CreateSubjektiDto) {}
