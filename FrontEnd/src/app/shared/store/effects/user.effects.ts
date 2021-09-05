import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { UserDto, UsersCRUDService } from '../../sdk';
import { addNewUser, addNewUserSuccess, deleteUser, deleteUserSuccess, loadUsers, loadUsersFailure, loadUsersSuccess, updateUser, updateUserSuccess } from '../actions/user.actions';

@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    concatMap(() => this._userService.usersControllerFindAll(1, 10, ['roles'], JSON.stringify({}))),
    map((response) => {
      // TODO Meta (pagenr, nritems etc) interface ....
      // console.log(response.items)
      return loadUsersSuccess({ users: response.items })
    })
  ));

  addNewUser$ = createEffect(() => this.actions$.pipe(
    ofType(addNewUser),
    concatMap((action) => this._userService.usersControllerCreateUser(action.user)),
    map((user) => {
      // console.log(user);
      return addNewUserSuccess({ user })
    })
  ));

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(updateUser),
    concatMap(({ update }) => this._userService.usersControllerUpdateUser(update.id as string, update.changes)),
    map((user: any) => {
      // console.log(user);
      return updateUserSuccess({ user })
    })
  ));

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(deleteUser),
    concatMap(({ id }) => this._userService.usersControllerDeleteUser(id)),
    map((user: any) => {
      // console.log(user);
      return deleteUserSuccess({ user })
    })
  ));

  constructor(
    private actions$: Actions, 
    private readonly _userService: UsersCRUDService) { }

}