import { Column } from "typeorm";

export class RegisterUserDto {

    @Column({ nullable: false, type: 'varchar', length: 50 })
    username: string;

    @Column({ nullable: false, type: 'varchar' })
    password: string;

    @Column({ nullable: true, type: 'varchar' })
    email: string;

    @Column({ nullable: true, type: 'varchar', length: 50 })
    phone: string;
  
}