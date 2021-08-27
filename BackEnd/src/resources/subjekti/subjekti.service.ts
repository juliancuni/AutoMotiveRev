import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjektiDto } from './dto/subjekti.dto';
import { UpdateSubjektiDto } from './dto/update-subjekti.dto';
import { SubjektiEntity } from './entities/subjekti.entity';

@Injectable()
export class SubjektiService {

  constructor(
    @InjectRepository(SubjektiEntity) private readonly subjektiRepo: Repository<SubjektiEntity>
  ) { }

  async create(createSubjektiDto: SubjektiDto) {
    return await this.subjektiRepo.save(createSubjektiDto);
  }

  async findAll() {
    return await this.subjektiRepo.find();
  }

  async findOne(id: string) {
    let subjekti = await this.subjektiRepo.findOne(id);
    if (subjekti) return subjekti;
    return new HttpException("Subjekti nuk egziston", HttpStatus.NOT_FOUND);
  }

  async update(id: string, updateSubjektiDto: UpdateSubjektiDto) {
    return await this.subjektiRepo.update(id, updateSubjektiDto);
  }

  async remove(id: string) {
    return await this.subjektiRepo.delete(id);
  }
}
