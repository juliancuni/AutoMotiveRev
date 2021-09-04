import { Column } from "typeorm";

export class LoginUserDto {

    @Column({ nullable: true, type: 'varchar', length: 50 })
    username: string;

    @Column({ nullable: true, type: 'varchar' })
    password: string;

    @Column({ nullable: true, type: 'varchar' })
    email: string;

}
