import { Column } from "typeorm";

export class LoginUserDto {

    @Column({ nullable: false, type: 'varchar' })
    identity: string;

    @Column({ nullable: true, type: 'varchar' })
    password: string;

}
