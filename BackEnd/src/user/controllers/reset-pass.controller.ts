import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ResetTokenDto } from "../dto/reset-pass.dto";
import { ResetPassService } from "../services/reset-pass.service";

@Controller('resetpass')
export class ResetPassController {
    constructor(private readonly resetPassService: ResetPassService) { }

    @Get('checktoken/:token')
    async checkToken(@Param('token') token: string) {
        return this.resetPassService.checkToken(token);
    }

    @Post('recovery')
    async recoveryPassword(@Body() email: string) {
        return await this.resetPassService.recovery(email);
    }

    @Post()
    async resetPass(@Body() resetTokenDto: ResetTokenDto) {
        return this.resetPassService.resetPass(resetTokenDto);
    }
}