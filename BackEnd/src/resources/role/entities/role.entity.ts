import { UserEntity } from "src/resources/user/entities/user.entity";
import { EntityBase } from "src/utils/entity.base";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity('rolet')
export class RoleEntity extends EntityBase {

    @Column({ unique: true, nullable: false })
    roli: string;

    @Column({ nullable: true })
    pershkrimi: string;

    @ManyToMany(() => UserEntity, (user: UserEntity) => user.rolet, { cascade: true })
    @JoinTable({name: 'users_roles'})
    userat: UserEntity[];
}
