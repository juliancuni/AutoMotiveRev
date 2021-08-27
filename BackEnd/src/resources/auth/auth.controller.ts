import { Body, Controller, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegjistroUserDto } from './dto/regjistro-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';
import ReqWithUser from './req-with-user.interface';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('regjistro')
    async regjistroUser(@Body() regjistroUserDto: RegjistroUserDto): Promise<UserDto> {
        return this.authService.regjistroUser(regjistroUserDto);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() request: ReqWithUser, @Res() response: Response) {
        const { user } = request;
        const cookie = this.authService.getCookieWithJwtToken(user.id)
        response.setHeader('Set-Cookie', cookie);
        return response.send(user);
    }
}
