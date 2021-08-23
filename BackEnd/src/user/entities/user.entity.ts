import { Subjekti } from "src/subjekti/entities/subjekti.entity";
import EntityBase from "src/utils/entity.base";
import { Column, Entity, ManyToOne, Unique } from "typeorm";

@Entity('users')
@Unique(['username', 'email'])
export class User extends EntityBase {

    @Column({ type: 'varchar'})
    username: string;
    @Column({ type: 'varchar' })
    password: string;
    @Column({ type: 'varchar' })
    email: string;
    @Column({ type: 'varchar', nullable: true })
    emer: string;
    @Column({ type: 'varchar', nullable: true })
    mbiemer: string;
    

    /** Subjekti te cilit ky user i perket */
    @ManyToOne(() => Subjekti, subjekti => subjekti.users)
    subjekti: Subjekti;
}
