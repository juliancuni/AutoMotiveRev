import {Entity, model, property} from '@loopback/repository';
import {v4 as uuid} from 'uuid';

@model({
  settings: {postgresql: {schema: 'public', table: 'users_roles'}},
})
export class UsersRoles extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid(),
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'string',
    required: true,
  })
  roleId: string;


  constructor(data?: Partial<UsersRoles>) {
    super(data);
  }
}

export interface UsersRolesRelations {
  // describe navigational properties here
}

export type UsersRolesWithRelations = UsersRoles & UsersRolesRelations;
