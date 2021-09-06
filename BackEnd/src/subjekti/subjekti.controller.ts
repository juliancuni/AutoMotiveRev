import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubjektiService } from './subjekti.service';
import { CreateSubjektiDto } from './dto/create-subjekti.dto';
import { UpdateSubjektiDto } from './dto/update-subjekti.dto';

@Controller('subjekti')
export class SubjektiController {
  constructor(private readonly subjektiService: SubjektiService) {}

  @Post()
  create(@Body() createSubjektiDto: CreateSubjektiDto) {
    return this.subjektiService.create(createSubjektiDto);
  }

  @Get()
  findAll() {
    return this.subjektiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjektiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjektiDto: UpdateSubjektiDto) {
    return this.subjektiService.update(+id, updateSubjektiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjektiService.remove(+id);
  }
}
