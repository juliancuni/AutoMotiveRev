import { UserEntity } from "src/user/entities/user.entity";
import { EntityBase } from "src/utils/entity.base";
import { Column, Entity, OneToMany, Unique } from "typeorm";

@Entity({ name: "subjektet" })
@Unique(['email', 'emer', 'nius', 'telefon'])
export class SubjektiEntity extends EntityBase {

    @Column({ type: 'varchar' })
    emer: string;
    @Column({ type: 'varchar', nullable: true })
    telefon: string;
    @Column({ type: 'text', nullable: true })
    adresa: string;
    @Column({ type: 'varchar', nullable: true })
    email: string;
    @Column({ type: 'varchar' })
    nius: string;
    @Column({ type: 'boolean', default: 1 })
    active: boolean;

    /** Userat e ketij Subjekti */
    @OneToMany(() => UserEntity, user => user.subjekti)
    users: UserEntity[];
}
