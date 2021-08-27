import { UserEntity } from "src/resources/user/entities/user.entity";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity('rolet')
export class RoleEntity {

    @Column({ unique: true, nullable: false })
    roli: string;

    @Column({ nullable: true })
    pershkrimi: string;

    @ManyToMany(() => UserEntity, (user: UserEntity) => user.rolet)
    userat: UserEntity[];
}
