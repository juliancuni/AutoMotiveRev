import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {UsersRoles, UsersRolesRelations} from '../models';

export class UsersRolesRepository extends DefaultCrudRepository<
  UsersRoles,
  typeof UsersRoles.prototype.id,
  UsersRolesRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(UsersRoles, dataSource);
  }
}
