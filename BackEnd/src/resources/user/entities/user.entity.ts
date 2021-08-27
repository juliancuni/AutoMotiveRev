import { Exclude } from "class-transformer";
import { EntityBase } from "src/utils/entity.base";
import { Column, Entity, Unique } from "typeorm";

@Entity('users')
@Unique(['username', 'email'])
export class UserEntity extends EntityBase {

    @Column({ type: 'varchar' })
    username: string;

    @Column({ type: 'varchar' })
    @Exclude()
    password: string;
    
    @Column({ type: 'varchar' })
    email: string;
    
    @Column({ type: 'varchar', nullable: true })
    emer: string;
    
    @Column({ type: 'varchar', nullable: true })
    mbiemer: string;

}
