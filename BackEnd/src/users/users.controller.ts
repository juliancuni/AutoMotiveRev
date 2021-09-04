import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('Users CRUD')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(
    private readonly userService: UsersService,
  ) { }

  @Get()
  @ApiQuery({ name: 'page', description: 'Page Nr', required: false, type: Number })
  @ApiQuery({ name: 'limit', description: 'Limit records per page (default 10, max 100)', required: false, type: Number })
  @ApiQuery({ name: 'relations', description: 'Model Relations', required: false, type: [String] })
  @ApiQuery({ name: 'where', description: 'Filter conditions (json)', required: false, type: String })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('relations') relations: string[] = [],
    @Query('where') where: string = "{}",
  ): Promise<Pagination<UserDto>> {
    limit = limit > 100 ? 100 : limit;
    return await this.userService.findAll({
      page, limit,
    }, relations, where);
  }

  @ApiParam({ name: 'id', description: 'User id', required: true, type: String })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Get('test/whoami')
  async whoAmI(@Request() req: any): Promise<UserDto> {
    console.log();
    return await this.userService.findOne(req.user.userId);
  }

  @ApiBody({ type: UserDto, description: 'New User JSON', required: true })
  @Post()
  async createUser(@Body() userDto: UserDto): Promise<UserDto> {
    return await this.userService.create(userDto);
  }

  @ApiParam({ name: 'id', description: 'User id', required: true, type: String })
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    return await this.userService.update(id, updateUserDto);
  }

  @ApiParam({ name: 'id', description: 'User id', required: true, type: String })
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

}
