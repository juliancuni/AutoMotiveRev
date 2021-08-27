import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { SubjektiService } from './subjekti.service';
import { UpdateSubjektiDto } from './dto/update-subjekti.dto';
import { SubjektiDto } from './dto/subjekti.dto';

@Controller('subjektet')
export class SubjektiController {
  constructor(private readonly subjektiService: SubjektiService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createSubjektiDto: SubjektiDto) {
    return await this.subjektiService.create(createSubjektiDto);
  }

  @Get()
  async findAll() {
    return await this.subjektiService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.subjektiService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSubjektiDto: UpdateSubjektiDto) {
    return await this.subjektiService.update(id, updateSubjektiDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.subjektiService.remove(id);
  }
}
