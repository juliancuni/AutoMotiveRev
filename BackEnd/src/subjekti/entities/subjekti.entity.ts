import AppBaseEntity from "src/helpers/shared/base.entity";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('subjekti')
@Unique(['name', 'nius', 'email'])
export class SubjektiEntity extends AppBaseEntity {

    @Column()
    name: string;

    @Column()
    nius: string;

    @Column()
    adresa: string;

    @Column()
    telefon: string;

    @Column()
    email: string;

    @Column()
    slogan: string;

    @Column()
    logo: string;


}
