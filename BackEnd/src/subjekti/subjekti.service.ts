import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjektiDto } from './dto/subjekti.dto';
import { UpdateSubjektiDto } from './dto/update-subjekti.dto';
import { SubjektiEntity } from './entities/subjekti.entity';

@Injectable()
export class SubjektiService {

  constructor(
    @InjectRepository(SubjektiEntity) private readonly subjektiRepo: Repository<SubjektiEntity>,
  ) { }

  async create(createSubjektiDto: SubjektiDto) {
    const subjekti = await this.findOne();
    if (subjekti) throw new BadRequestException('Nuk mund te kete me shume se 1 subjekt per instance');
    return this.subjektiRepo.save(createSubjektiDto);
  }

  async findOne(): Promise<SubjektiDto> {
    return await this.subjektiRepo.findOne();
  }

  async update(updateSubjektiDto: UpdateSubjektiDto) {
    let subjekti = await this.subjektiRepo.findOne();
    subjekti = await this.subjektiRepo.preload({ id: subjekti.id, ...updateSubjektiDto });
    return await this.subjektiRepo.save(subjekti);
  }
}
