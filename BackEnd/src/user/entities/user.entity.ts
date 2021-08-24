import { Min } from "class-validator";
import { SubjektiEntity } from "src/subjekti/entities/subjekti.entity";
import EntityBase from "src/utils/entity.base";
import { BeforeInsert, Column, Entity, ManyToOne, Unique } from "typeorm";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}


@Entity('users')
@Unique(['username', 'email'])
export class UserEntity extends EntityBase {

    @Column({ type: 'varchar' })
    username: string;
    @Column({ type: 'varchar', select: false })
    @Min(6, { message: "Password duhet te jete te pakten 6 karaktere" })
    password: string;
    @Column({ type: 'varchar' })
    email: string;
    @Column({ type: 'varchar', nullable: true })
    emer: string;
    @Column({ type: 'varchar', nullable: true })
    mbiemer: string;
    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;
    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }

    /** Subjekti te cilit ky user i perket */
    @ManyToOne(() => SubjektiEntity, subjekti => subjekti.users)
    subjekti: SubjektiEntity;
}
