import { Injectable } from '@nestjs/common';
import { CreateSubjektiDto } from './dto/create-subjekti.dto';
import { UpdateSubjektiDto } from './dto/update-subjekti.dto';

@Injectable()
export class SubjektiService {
  create(createSubjektiDto: CreateSubjektiDto) {
    return 'This action adds a new subjekti';
  }

  findAll() {
    return `This action returns all subjekti`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subjekti`;
  }

  update(id: number, updateSubjektiDto: UpdateSubjektiDto) {
    return `This action updates a #${id} subjekti`;
  }

  remove(id: number) {
    return `This action removes a #${id} subjekti`;
  }
}
