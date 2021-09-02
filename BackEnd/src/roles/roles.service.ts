import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleDto } from './dto/role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity) private readonly roleRepo: Repository<RoleEntity>,
  ) { }

  async findAll(): Promise<RoleDto[]> {
    return await this.roleRepo.find();
  }

  async findOneById(id: string): Promise<RoleDto> {
    this._isUUID(id);
    const role = await this.roleRepo.findOne(id);
    if (!role) throw new NotFoundException(`roleId ${id} nuk egziston!`)
    return role;
  }

  async findOneByRoleName(role: string): Promise<RoleDto> {
    const roleFound = await this.roleRepo.findOne({ role });
    // if (!roleFound) throw new NotFoundException(`role ${role} nuk egziston!`)
    return roleFound;
  }

  async create(roleDto: RoleDto): Promise<RoleDto> {
    const user = await this.roleRepo.findOne({ role: roleDto.role });
    if (user) throw new BadRequestException(`Egziston i regjistruar ky username: "${roleDto.role}"`);
    const newRole = this.roleRepo.create(roleDto);
    return await this.roleRepo.save(newRole);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<RoleDto> {
    this._isUUID(id);
    const role = await this.roleRepo.preload({ id, ...updateRoleDto });
    if (!role) throw new NotFoundException(`roleId ${id} nuk egziston`);
    return await this.roleRepo.save(role);
  }

  async delete(id: string): Promise<RoleDto> {
    this._isUUID(id);
    const role = await this.findOneById(id);
    return await this.roleRepo.softRemove(role);
  }

  private _isUUID(uuid: string) {
    let s: any = "" + uuid;
    s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) throw new NotFoundException(`roleId ${uuid} nuk egziston!!`);
  }
}
