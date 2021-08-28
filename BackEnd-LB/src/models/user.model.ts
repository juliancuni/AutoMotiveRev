import {Entity, hasMany, model, property} from '@loopback/repository';
import {v4 as uuid} from 'uuid';
import {Role} from './role.model';
import {UsersRoles} from './users-roles.model';

@model({
  settings: {postgresql: {schema: 'public', table: 'users'}},
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid(),
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    unique: true
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasMany(() => Role, {through: {model: () => UsersRoles}})
  roles: Role[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
