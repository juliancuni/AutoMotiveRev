import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository, UpdateResult } from 'typeorm';
import { LoginUserDto } from '../dto/login-user.dto';
import { UpdatePassDto } from '../dto/update-pass.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserTokenDto } from '../dto/user-token.dto';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';
import { IUser } from '../entities/user.interface';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) { }

  //Regjistro usera
  async regjistro(createUserDto: UserDto): Promise<IUser> {
    //Kontrollo nese username eshte i zene
    let usercount = await this.userRepo.count({ username: createUserDto.username });
    if (usercount > 0) throw new HttpException(`Username '${createUserDto.username}' egziston`, HttpStatus.CONFLICT);
    //Kontrollo nese email eshte i zene
    usercount = await this.userRepo.count({ email: createUserDto.email });
    if (usercount > 0) throw new HttpException(`Email '${createUserDto.email}' egziston`, HttpStatus.CONFLICT);
    return await this.authService.hashPass(createUserDto.password).then((hashedPass) => {
      createUserDto.password = hashedPass;
      return this.userRepo.save(createUserDto).then((savedUser: IUser) => {
        const { password, ...user } = savedUser;
        return user;
      });
    })
  }
  //Login
  async login(loginUserDto: LoginUserDto): Promise<UserTokenDto> {
    let userByUserName = await this.userRepo.findOne({ username: loginUserDto.username }, { select: ['id', 'username', 'password', 'roles'] });
    if (!userByUserName) throw new HttpException(`Username '${loginUserDto.username}' nuk egziston`, HttpStatus.NOT_FOUND);
    let passwordMatch = await this.authService.comparePass(loginUserDto.password, userByUserName.password);
    if (!passwordMatch) throw new HttpException(`Password gabim`, HttpStatus.UNAUTHORIZED);
    const { password, ...user } = userByUserName;
    const token: string = await this.authService.generateJwt(user);
    const access_token = { access_token: token };
    const userWithToken = { ...userByUserName, ...access_token };
    return userWithToken;
  }
  //Gjej te gjithe userat
  async gjejTeGjithe(): Promise<IUser[]> {
    return await this.userRepo.find();
  }
  //Gjej 1 user nga id
  async gjejNjeUserNgaId(id: string): Promise<IUser> {
    return await this.userRepo.findOne(id);
  }
  async gjejNjeCondtion(contidion: any): Promise<IUser> {
    return await this.userRepo.findOne(contidion);
  }
  //Gjej userin tend
  async kushJamUne() {

  }
  //Update user
  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }
  //Ndrysho Passwordin per user
  async ndyshoPassword(userId: string, updatePassDto: UpdatePassDto): Promise<UpdateResult> {
    //Kontrollo nese id eshte ne formatin e duhur (UUID)
    if (this._isUUID(userId)) {
      const user = await this.userRepo.findOne(userId, { select: ['password'] });
      //Kontrollo nese user egziston
      if (user) {
        const passwordMatch = await this.authService.comparePass(updatePassDto.oldPassword, user.password);
        let newHashedPassword: string;
        //Kontrollo passwordin e vjeter
        if (passwordMatch) {
          newHashedPassword = await this.authService.hashPass(updatePassDto.newPassword)
        } else {
          throw new HttpException('Passwordi i vjeter gabim', HttpStatus.UNAUTHORIZED);
        };
        const updated = await this.update(userId, { password: newHashedPassword });
        return updated;
      } else {
        throw new HttpException('Nuk ka asnje rekord per kete id', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException("Id eshte format gabim", HttpStatus.NOT_ACCEPTABLE);
    }
  }
  //Remove user
  async remove(id: string) {
    return await this.userRepo.softDelete(id);
  }
  /**Private functions */
  //Kontrollo formatin UUID
  private _isUUID(uuid: string) {
    let s: any = "" + uuid;
    s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
    if (s === null) return false;
    return true;
  }
}




