import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Role, RoleRelations, User, UsersRoles} from '../models';
import {UsersRolesRepository} from './users-roles.repository';
import {UserRepository} from './user.repository';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.id,
  RoleRelations
> {

  public readonly users: HasManyThroughRepositoryFactory<User, typeof User.prototype.id,
          UsersRoles,
          typeof Role.prototype.id
        >;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('UsersRolesRepository') protected usersRolesRepositoryGetter: Getter<UsersRolesRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Role, dataSource);
    this.users = this.createHasManyThroughRepositoryFactoryFor('users', userRepositoryGetter, usersRolesRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
