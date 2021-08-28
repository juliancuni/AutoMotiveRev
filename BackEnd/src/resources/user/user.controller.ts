import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import JwtAuthGuard from '../auth/guards/jwt-auth.guart';
import { ApiTags } from '@nestjs/swagger';
import { string } from '@hapi/joi';

@Controller('userat')
@ApiTags('Userat')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('regjistro')
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: UserDto): Promise<UserDto> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.userService.remove(id);
  }

  @Get('username/:username')
  async findUsername(@Param('username') username: string) {
    return await this.userService.findUserByUsername(username);
  }

  @Post(':userId/role/:roleId')
  async addRoleToUser(@Param('userId') userId: string, @Param('roleId') roleId: string) {
    return this.userService.addRoleToUser(userId, roleId);
  }
}
