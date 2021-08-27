import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegjistroUserDto } from './dto/regjistro-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UserDto } from '../user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly confService: ConfigService,
    ) { }

    async regjistroUser(regjistroUserDto: RegjistroUserDto) {
        const hashedPass = await bcrypt.hash(regjistroUserDto.password, 12);
        regjistroUserDto.password = hashedPass;
        return this.userService.create(regjistroUserDto);
    }

    async login(loginDto: LoginDto): Promise<UserDto> {
        const user = await this.userService.findUserByUsername(loginDto.username);
        if (!user) throw new HttpException('Username ose password gabim', HttpStatus.BAD_REQUEST);
        await this._verifyPassword(loginDto.password, user.password);
        return user;
    }

    private async _verifyPassword(plainTextPass: string, hashedPass: string) {
        if (!await bcrypt.compare(plainTextPass, hashedPass)) throw new HttpException('Username ose password gabim', HttpStatus.BAD_REQUEST);
    }

    public getCookieWithJwtToken(userId: string) {
        const payload: TokenPayload = { userId };
        const token: string = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.confService.get('JWT_EXPIRATION_TIME')}`;
    }
}
