import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUIDCheckPipe } from 'src/helpers/pipes/uuid.pipe';
import { RoleDto } from './dto/role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';
import { RolesService } from './roles.service';

@ApiTags('Roles CRUD')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly roleService: RolesService,
  ) { }

  @Get()
  async findAll(): Promise<RoleDto[]> {
    return await this.roleService.findAll();
  }

  @Get(':uuid')
  async findById(@Param('uuid', UUIDCheckPipe) id: string) {
    return await this.roleService.findOneById(id);
  }

  @Post()
  async create(@Body() role: RoleDto): Promise<RoleDto> {
    return await this.roleService.create(role);
  }

  @Patch(':uuid')
  async update(@Param('uuid', UUIDCheckPipe) id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<RoleDto> {
    return await this.roleService.update(id, updateRoleDto);
  }

  @Delete(':uuid')
  async delete(@Param('uuid', UUIDCheckPipe) id: string): Promise<RoleDto> {
    return this.roleService.delete(id);
  }

}
