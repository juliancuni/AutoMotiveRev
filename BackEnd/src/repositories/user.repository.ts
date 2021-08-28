import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Role, User, UserRelations, UsersRoles} from '../models';
import {RoleRepository} from './role.repository';
import {UsersRolesRepository} from './users-roles.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {


  public readonly roles: HasManyThroughRepositoryFactory<Role, typeof Role.prototype.id,
    UsersRoles,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('UsersRolesRepository') protected usersRolesRepositoryGetter: Getter<UsersRolesRepository>, @repository.getter('RoleRepository') protected roleRepositoryGetter: Getter<RoleRepository>,
  ) {
    super(User, dataSource);
    this.roles = this.createHasManyThroughRepositoryFactoryFor('roles', roleRepositoryGetter, usersRolesRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
