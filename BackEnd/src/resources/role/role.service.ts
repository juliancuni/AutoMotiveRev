import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleDto } from './dto/role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(RoleEntity) private readonly roleRepo: Repository<RoleEntity>
  ) { }

  async create(roleDto: RoleDto) {
    return await this.roleRepo.save(roleDto);
  }

  async findAll() {
    return await this.roleRepo.find();
  }

  async findOne(id: string) {
    return await this.roleRepo.findOne(id);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return await this.roleRepo.update(id, updateRoleDto);
  }

  async remove(id: string) {
    return await this.roleRepo.softDelete(id);
  }
}
