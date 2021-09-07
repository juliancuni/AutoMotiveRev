import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { SubjektiService } from './subjekti.service';
import { SubjektiDto } from './dto/subjekti.dto';
import { UpdateSubjektiDto } from './dto/update-subjekti.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('subjekti')
@ApiTags('Subjekti')
export class SubjektiController {
  constructor(private readonly subjektiService: SubjektiService) { }

  @UseGuards(AuthGuard('jwt'), RolesGuard)

  @Roles('admin', 'root')
  @Post()
  create(@Body() createSubjektiDto: SubjektiDto) {
    return this.subjektiService.create(createSubjektiDto);
  }

  @Get()
  findOne() {
    return this.subjektiService.findOne();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'root')
  @Patch()
  update(@Body() updateSubjektiDto: UpdateSubjektiDto) {
    return this.subjektiService.update(updateSubjektiDto);
  }
}
