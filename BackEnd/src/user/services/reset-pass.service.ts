import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ResetPassEntity } from "../entities/reset-pass.entity";
import { UserService } from "./user.service";
import { Request } from 'express';
import { IResetPass } from "../entities/reset-pass.interface";
import { MailService } from "src/mail/mail.service";
import { ResetTokenDto } from "../dto/reset-pass.dto";
import { AuthService } from "src/auth/auth.service";

@Injectable({ scope: Scope.REQUEST })
export class ResetPassService {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        @InjectRepository(ResetPassEntity) private readonly resetPassRepo: Repository<ResetPassEntity>,
        private readonly userSerice: UserService,
        private readonly mailService: MailService,
        private readonly authService: AuthService,
    ) { }

    //Recovery Passwordin ne rast se e ke harruar. Dergo mesazh ne emalin respektiv
    async recovery(emailObj: any) {
        const { email } = emailObj;
        let user = await this.userSerice.gjejNjeCondtion({ email });
        if (user) {
            const reset_token = this._tokenGen();
            const headers = JSON.stringify(this.request.headers);
            const from_ip = this.request.ip;
            let time_to_live = new Date();
            time_to_live = new Date(time_to_live.setMinutes(time_to_live.getMinutes() + 30));
            const resetPass: IResetPass = {
                from_ip,
                headers,
                reset_token,
                time_to_live,
                userId: user.id
            };
            const reset_pass = await this.resetPassRepo.save(resetPass);
            if (reset_pass) {
                this.mailService.sendMailRecoveryPass(user, reset_token);
                return { message: "Hapni emailin tuaj" }
            }
        } else {
            throw new HttpException('Emaili nuk egziston', HttpStatus.NOT_FOUND);
        }
    }

    async resetPass(resetTokenDto: ResetTokenDto) {
        const reset_token = await this.resetPassRepo.findOne({ reset_token: resetTokenDto.token })
        if (!reset_token || reset_token.time_to_live < new Date() || reset_token.isRecovered) throw new HttpException("Ky link ka skaduar ose nuk eshte i sakte", HttpStatus.NOT_FOUND);
        const password = await this.authService.hashPass(resetTokenDto.newPassword)
        await this.update(reset_token.id, { isRecovered: true })
        return await this.userSerice.update(reset_token.userId, { password });
    }
    //Duhet per front-end. Kur useri te hape emailin dhe te klikoi linkun, duhen bere verifikimet e meposhteme (per me shume user experience)
    async checkToken(token: string) {
        let reset_token = await this.resetPassRepo.findOne({ reset_token: token })
        //Nese nuk egziston ose ka skaduar ose nuk eshte bere recovered me pare, throw error
        if (!reset_token || reset_token.time_to_live < new Date() || reset_token.isRecovered) {
            throw new HttpException("Ky link ka skaduar ose nuk eshte i sakte", HttpStatus.NOT_FOUND);
        }
        //Nese jo, send http ok status
        return HttpStatus.OK;
    }

    async update(id: string, updateResetPass: any) {
        return this.resetPassRepo.update(id, updateResetPass);
    }

    //Gjenero UUID Token Generator
    private _tokenGen(): string {
        const TokenGenerator = require('uuid-token-generator');
        const token = new TokenGenerator(512, TokenGenerator.BASE62);
        return token.generate();
    }
}