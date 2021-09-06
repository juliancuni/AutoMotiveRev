import AppBaseEntity from 'src/helpers/shared/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, Unique } from 'typeorm';

@Entity('roles')
@Unique(['role'])
export class RoleEntity extends AppBaseEntity {
  
  @Column({ nullable: false, type: 'varchar', length: 20 })
  role: string;

  @Column({ nullable: true, type: 'varchar' })
  desc?: string;

  @ManyToMany((_) => UserEntity, (user) => user.roles)
  users: UserEntity[];
  
}
