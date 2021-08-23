import { Subjekti } from "src/subjekti/entities/subjekti.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('users')
@Unique(['username', 'email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
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
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    /** Subjekti te cilit ky user i perket */
    @ManyToOne(() => Subjekti, subjekti => subjekti.users)
    subjekti: Subjekti;
}
