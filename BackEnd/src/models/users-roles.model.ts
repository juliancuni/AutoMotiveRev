import {Entity, model, property} from '@loopback/repository';

@model()
export class UsersRoles extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
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
