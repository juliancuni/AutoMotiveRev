import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "subjektet" })
@Unique(['email', 'emer', 'nius', 'telefon'])
export class Subjekti extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar' })
    emer: string;
    @Column({ type: 'varchar' })
    telefon: string;
    @Column({ type: 'text' })
    adresa: string;
    @Column({ type: 'varchar' })
    email: string;
    @Column({ type: 'varchar' })
    nius: string;
    @Column({ type: 'boolean', default: 1 })
    active: boolean;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    /** Userat e ketij Subjekti */
    @OneToMany(() => User, user => user.subjekti)
    users: User[];
}
