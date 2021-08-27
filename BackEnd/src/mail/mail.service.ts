import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
// import { IUser } from 'src/user/entities/user.interface';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendMailRecoveryPass(user: UserDto, reset_token: string) {
        const url = "http://example.com/resetpassword/" + reset_token;
        await this.mailerService.sendMail({
            to: user.email,
            from: '"Support Team" <info@microservices.al>', // override default from
            subject: 'Rekupero Fjalekalimin',
            template: './resetpassword',
            context: {
                url: url,
                name: user.emer + " " + user.mbiemer
            }
        });
    }
}
