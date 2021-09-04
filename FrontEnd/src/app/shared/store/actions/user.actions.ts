import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { UserDto } from '../../sdk';

/** Load Users */
export const loadUsers = createAction(
  '[User Resolver] Load Users'
);

export const loadUsersSuccess = createAction(
  '[Effect loadUsers$] Load Users Success',
  props<{ users: UserDto[] }>()
);

export const loadUsersFailure = createAction(
  '[Effect loadUsers$] Load Users Failure',
  props<{ error: any }>()
);

/** Add User */
export const addNewUser = createAction(
  '[User Modal] Add New User',
  props<{ user: UserDto }>()
);

export const addNewUserSuccess = createAction(
  '[Effect addNewUser$] Add New User Success',
  props<{ user: UserDto }>()
);

export const addNewUserFailure = createAction(
  '[Effect addNewUser$] Add New User Failure',
  props<{ error: any }>()
);

/** Update User */
export const updateUser = createAction(
  '[User Modal] Update User',
  props<{ update: Update<UserDto> }>()
);

export const updateUserSuccess = createAction(
  '[Effect updateUser$] Update User Success',
  props<{ user: UserDto }>()
);

export const updateUserFailure = createAction(
  '[Effect updateUser$] Update User Failure',
  props<{ error: any }>()
);

/** Remove User */
export const deleteUser = createAction(
  '[User List] delete User',
  props<{ id: string }>()
);

export const deleteUserSuccess = createAction(
  '[Effect deleteUser$] delete User Success',
  props<{ user: UserDto }>()
);

export const deleteUserFailure = createAction(
  '[Effect deleteUser$] delete User Failure',
  props<{ error: any }>()
);

