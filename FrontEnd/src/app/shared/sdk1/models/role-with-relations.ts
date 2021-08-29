/* tslint:disable */
/* eslint-disable */
import { UserWithRelations } from './user-with-relations';

/**
 * (tsType: RoleWithRelations, schemaOptions: { includeRelations: true })
 */
export interface RoleWithRelations {
  desc?: string;
  id?: string;
  role: string;
  users?: Array<UserWithRelations>;
}
