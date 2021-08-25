import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository, UpdateResult } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePassDto } from './dto/update-pass.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserTokenDto } from './dto/user-token.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { IUser } from './entities/user.interface';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) { }

  //Regjistro usera
  async create(createUserDto: UserDto): Promise<IUser> {
    let userByUserName = await this._findUserByUsername(createUserDto.username);
    let userByEmail = await this._findUserByEmail(createUserDto.email);
    if (userByUserName) throw new HttpException(`Username '${createUserDto.username}' egziston`, HttpStatus.CONFLICT);
    if (userByEmail) throw new HttpException(`Email '${createUserDto.email}' egziston`, HttpStatus.CONFLICT);
    return await this.authService.hashPass(createUserDto.password).then((hashedPass) => {
      createUserDto.password = hashedPass;
      return this.userRepo.save(createUserDto).then((savedUser: IUser) => {
        //remove password
        const { password, ...user } = savedUser;
        return user;
      });
    })
  }
  //Login
  async login(loginUserDto: LoginUserDto): Promise<UserTokenDto> {
    let userByUserName = await this._findUserByUsername(loginUserDto.username);
    if (!userByUserName) throw new HttpException(`Username '${loginUserDto.username}' nuk egziston`, HttpStatus.NOT_FOUND);
    let passwordMatch = await this.authService.comparePass(loginUserDto.password, userByUserName.password);
    if (!passwordMatch) throw new HttpException(`Password gabim`, HttpStatus.UNAUTHORIZED);
    const { password, ...user } = userByUserName;

    const token: string = await this.authService.generateJwt(user);
    const access_token = { access_token: token };

    const userWithToken = { ...userByUserName, ...access_token };

    return userWithToken;
  }

  async findAll(): Promise<IUser[]> {
    return await this.userRepo.find();
  }

  async findOne(id: string): Promise<IUser> {
    return await this.userRepo.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }

  async changePassword(userId: string, updatePassDto: UpdatePassDto): Promise<HttpException | UpdateResult> {
    const user = await this.userRepo.findOne(userId, { select: ['password'] });
    const passwordMatch = await this.authService.comparePass(updatePassDto.oldPassword, user.password);
    let newHashedPassword: string;
    if (passwordMatch) {
      newHashedPassword = await this.authService.hashPass(updatePassDto.newPassword)
    } else {
      return new HttpException('Passwordi i vjeter gabim', HttpStatus.UNAUTHORIZED);
    };
    const updated = await this.update(userId, { password: newHashedPassword });
    return updated;
  }

  async remove(id: string) {
    return await this.userRepo.softDelete(id);
  }

  //Duhet per authentication
  private async _findUserByUsername(username: string): Promise<IUser> {
    return await this.userRepo.findOne({ username }, { select: ['id', 'username', 'password'] });
  }

  //Duhet per authentication
  private async _findUserByEmail(email: string): Promise<IUser> {
    return await this.userRepo.findOne({ email }, { select: ['id', 'username', 'password'] });
  }

  //Duhet per authentication
  private async _validatePassword(plainTextPass: string, hashedPass: string) {
    return await this.authService.comparePass(plainTextPass, hashedPass);
  }

  //Duhet per regjistrim
  private async _usernameEmailExists() { }
}
