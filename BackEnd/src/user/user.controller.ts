import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpCode, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { IUser } from './entities/user.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { hasRoles } from 'src/auth/utils/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('userat')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('regjistro')
  // @UsePipes(ValidationPipe) ***added globally in main.ts
  async create(@Body() userDto: UserDto): Promise<IUser> {
    return await this.userService.create(userDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles('admin')
  @Get()
  async findAll(): Promise<IUser[]> {
    return await this.userService.findAll();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IUser> {
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

  // @Get('username/:username')
  // async findUsername(@Param('username') username: string): Promise<IUser> {
  //   return await this.userService.findUserByUsername(username);
  // }
}
