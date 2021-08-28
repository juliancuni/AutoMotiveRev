import {Entity, hasMany, model, property} from '@loopback/repository';
import {User} from './user.model';
import {UsersRoles} from './users-roles.model';

@model()
export class Role extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @hasMany(() => User, {through: {model: () => UsersRoles}})
  users: User[];

  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
