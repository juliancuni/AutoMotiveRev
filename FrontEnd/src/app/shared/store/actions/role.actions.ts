import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { RoleDto } from '../../sdk';

/** Load Roles */
export const loadRoles = createAction(
  '[Role Resolver] Load Roles'
);

export const loadRolesSuccess = createAction(
  '[Effect loadRoles$] Load Roles Success',
  props<{ roles: RoleDto[] }>()
);

export const loadRolesFailure = createAction(
  '[Effect loadRoles$] Load Roles Failure',
  props<{ error: any }>()
);

/** Add Role */
export const addNewRole = createAction(
  '[Role Modal] Add New Role',
  props<{ role: RoleDto }>()
);

export const addNewRoleSuccess = createAction(
  '[Effect addNewRole$] Add New Role Success',
  props<{ role: RoleDto }>()
);

export const addNewRoleFailure = createAction(
  '[Effect addNewRole$] Add New Role Failure',
  props<{ error: any }>()
);

/** Update Role */
export const updateRole = createAction(
  '[Role Modal] Update Role',
  props<{ update: Update<RoleDto> }>()
);

export const updateRoleSuccess = createAction(
  '[Effect updateRole$] Update Role Success',
  props<{ role: RoleDto }>()
);

export const updateRoleFailure = createAction(
  '[Effect updateRole$] Update Role Failure',
  props<{ error: any }>()
);

/** Remove Role */
export const deleteRole = createAction(
  '[Role List] delete Role',
  props<{ id: string }>()
);

export const deleteRoleSuccess = createAction(
  '[Effect deleteRole$] delete Role Success',
  props<{ role: RoleDto }>()
);

export const deleteRoleFailure = createAction(
  '[Effect deleteRole$] delete Role Failure',
  props<{ error: any }>()
);