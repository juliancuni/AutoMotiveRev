import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "subjektet" })
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
}
