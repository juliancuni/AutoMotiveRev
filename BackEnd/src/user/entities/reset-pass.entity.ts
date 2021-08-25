import { IsIP } from "class-validator";
import EntityBase from "src/utils/entity.base";
import { Column, Entity, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('reset_pass')
export class ResetPassEntity extends EntityBase {
    @Column()
    @IsIP()
    from_ip: string;

    @Column({ type: 'text' })
    headers: string;

    @Column()
    reset_token: string;

    @Column({ type: 'timestamp' })
    time_to_live: Date;

    @Column({ type: 'bool', default: 0 })
    isRecovered: boolean;

    @Column({type: 'uuid'})
    userId: string;
}