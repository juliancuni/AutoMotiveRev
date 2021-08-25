import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpCode, UseGuards, HttpException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { IUser } from '../entities/user.interface';
import { LoginUserDto } from '../dto/login-user.dto';
import { hasRoles } from 'src/auth/utils/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdatePassDto } from '../dto/update-pass.dto';

@Controller('userat')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('regjistro')
  async regjistro(@Body() userDto: UserDto): Promise<IUser> {
    return await this.userService.regjistro(userDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @hasRoles('admin')
  @Get()
  async gjejTeGjithe(): Promise<IUser[]> {
    return await this.userService.gjejTeGjithe();
  }
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IUser> {
    return await this.userService.gjejNjeUserNgaId(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return await this.userService.update(id, updateUserDto);
  }

  @Patch('changepass/:id')
  async updatePassword(@Param('id') id: string, @Body() updatePassDto: UpdatePassDto): Promise<HttpException | UpdateResult> {
    return await this.userService.ndyshoPassword(id, updatePassDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.userService.remove(id);
  }
}
