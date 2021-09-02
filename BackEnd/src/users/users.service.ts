import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDto } from 'src/helpers/shared/pagination.dto';
import { RoleDto } from 'src/roles/dto/role.dto';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
    private readonly roleService: RolesService,
  ) { }

  async findAll(options: IPaginationOptions, relations: string[], where: string): Promise<Pagination<UserDto>> {
    where = JSON.parse(where);
    return await paginate<UserDto>(this.userRepo, options, { relations: (typeof relations === "string") ? [relations] : relations, where });
  }

  async findOne(id: string): Promise<UserDto> {
    this._isUUID(id);
    const user = await this.userRepo.findOne(id);
    if (!user) throw new NotFoundException(`userId ${id} nuk egziston!`)
    return user;
  }

  async create(userDto: UserDto): Promise<UserDto> {
    const password = "36638833";
    let roles = [];
    if (userDto.roles) roles = await Promise.all(userDto.roles.map((role) => this.preloadRole(role)));
    const user = await this.userRepo.findOne({ username: userDto.username });
    if (user) throw new BadRequestException(`Egziston i regjistruar ky username: "${user.username}"`);
    const newUser = this.userRepo.create({ ...userDto, password, roles });
    return await this.userRepo.save(newUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    this._isUUID(id);
    const roles = updateUserDto.roles && (await Promise.all(updateUserDto.roles.map((role) => this.preloadRole(role))));
    const user = await this.userRepo.preload({ id, ...updateUserDto, roles });
    if (!user) throw new NotFoundException(`userId ${id} nuk egziston`);
    return await this.userRepo.save(user);
  }

  async delete(id: string) {
    this._isUUID(id);
    const user = await this.findOne(id);
    return await this.userRepo.softRemove(user);
  }

  private async preloadRole(roleDto: RoleDto) {
    const existingRole = await this.roleService.findOneByRoleName(roleDto.role);
    if (existingRole) return existingRole;
    return await this.roleService.create(roleDto);
  }

  private _isUUID(uuid: string) {
    let s: any = "" + uuid;
    s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) throw new NotFoundException(`userId ${uuid} nuk egziston!!`);
  }

}
