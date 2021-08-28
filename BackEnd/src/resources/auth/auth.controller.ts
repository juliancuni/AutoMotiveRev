import { Body, Controller, HttpCode, Post, Req, Res, SerializeOptions, UseGuards } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { RegjistroUserDto } from './dto/regjistro-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import ReqWithUser from './interfaces/req-with-user.interface';
import JwtAuthGuard from './guards/jwt-auth.guart';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
// @SerializeOptions({
//     strategy: 'excludeAll'
// })
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('regjistro')
    async regjistroUser(@Body() regjistroUserDto: RegjistroUserDto): Promise<UserDto> {
        return this.authService.regjistroUser(regjistroUserDto);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() request: ReqWithUser) {
        const { user } = request;
        console.log('user')
        const cookie = this.authService.getCookieWithJwtToken(user.id)
        request.res.setHeader('Set-Cookie', cookie);
        return request.res.send(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logOut(@Req() request: ReqWithUser) {
        request.res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
        return request.res.sendStatus(200);
    }
}
