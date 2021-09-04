import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserDto } from '../users/dto/user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async login(loginDto: LoginUserDto): Promise<TokenDto> {
        const user = await this.userService.findUserFromAuthPublic(loginDto);
        if (!user) throw new UnauthorizedException('Login deshtoi. Kredencialet nuk jane te rregullta!');
        if (!user.isActive) throw new NotFoundException('Ky user eshte pezulluar');
        if (!await this._comparePass(loginDto.password, user.password)) throw new UnauthorizedException('Login deshtoi. Kredencialet nuk jane te rregullta!!');
        
        const token = await this.jwtService.signAsync({ userId: user.id, username: user.username })
        const access_token: TokenDto = { access_token: token }
        return access_token;
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserDto> {
        let user = await this.userService.findUserFromAuthPublic(registerUserDto);
        if (user) throw new UnauthorizedException('Ky user eshte regjistruar me pare!');
        //hash pass
        let { password } = registerUserDto;
        password = await this._hashPass(password);
        registerUserDto = { ...registerUserDto, password, phone: "N/A" };
        return this.userService.registerAuthPublic(registerUserDto);
    }


    private async _hashPass(plainTextPass: string): Promise<string> {
        return await bcrypt.hash(plainTextPass, 12);
    }

    private async _comparePass(plainTextPass: string, hashedPass: string): Promise<boolean> {
        return await bcrypt.compare(plainTextPass, hashedPass);
    }
}
