import { UserEntity } from "src/user/entities/user.entity";
import EntityBase from "src/utils/entity.base";
import { Column, Entity, JoinTable, ManyToMany, Unique } from "typeorm";

@Entity('rolet')
@Unique(['emri'])
export class RoleEntity extends EntityBase {
    @Column()
    emri: string;
    @Column({ type: 'text', nullable: true })
    pershkrimi: string;

    /** Userat qe ky rol u perket */
    @ManyToMany(() => UserEntity, userEntity => userEntity.roles)
    @JoinTable()
    users: UserEntity[];

}
