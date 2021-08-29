/* tslint:disable */
/* eslint-disable */
import { RoleWithRelations } from './role-with-relations';

/**
 * (tsType: UserWithRelations, schemaOptions: { includeRelations: true })
 */
export interface UserWithRelations {
  id?: string;
  password: string;
  roles?: Array<RoleWithRelations>;
  username: string;
}
