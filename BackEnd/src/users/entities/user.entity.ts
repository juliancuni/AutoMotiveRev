import AppBaseEntity from 'src/helpers/shared/base.entity';
import { RoleEntity } from 'src/roles/entities/role.entity';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, Unique } from 'typeorm';

@Entity('users')
@Unique(['username', 'email', 'docId', 'phone'])
export class UserEntity extends AppBaseEntity {

  @Column({ nullable: false, type: 'varchar', length: 50 })
  username: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column({ nullable: false, type: 'varchar' })
  email: string;

  @Column({ nullable: true, type: 'varchar' })
  docId: string;

  @Column({ nullable: true, type: 'varchar', length: 20 })
  emer: string;

  @Column({ nullable: true, type: 'varchar', length: 20 })
  mbiemer: string;

  @Column({ nullable: true, type: 'varchar', length: 20 })
  alias: string;

  @Column({ nullable: true, type: 'varchar' })
  photo: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  phone: string;

  @Column({ nullable: true, type: 'text' })
  address: string;

  @JoinTable({ name: 'users_roles' })
  @ManyToMany((_) => RoleEntity, (role) => role.users, { cascade: true })
  roles: RoleEntity[];

}
