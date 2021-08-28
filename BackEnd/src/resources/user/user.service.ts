import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    private readonly roleService: RoleService,
    ) { }

  async create(createUserDto: UserDto): Promise<UserDto> {
    return await this.userRepo.save(createUserDto);
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: string) {
    return await this.userRepo.findOne(id);
  }

  //Duhet per authentication
  async findUserByUsername(username: string) {
    return await this.userRepo.findOne({ where: { username: username } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepo.softDelete(id);
  }

  async addRoleToUser(userId: string, roleId: string) {
    let user  = await this.findOne(userId);
    let role = await this.roleService.findOne(roleId);
    user.rolet.push(role);
    return await this.userRepo.save(user);
  }
}
