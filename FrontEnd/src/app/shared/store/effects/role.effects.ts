import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { RolesCRUDService, RoleDto } from '../../sdk';
import { addNewRole, addNewRoleSuccess, deleteRole, deleteRoleSuccess, loadRoles, loadRolesFailure, loadRolesSuccess, updateRole, updateRoleSuccess } from '../actions/role.actions';

@Injectable()
export class RoleEffects {

  loadRoles$ = createEffect(() => this.actions$.pipe(
    ofType(loadRoles),
    concatMap(() => this.roleService.rolesControllerFindAll()),
    map((roles) => {
      // TODO Meta (pagenr, nritems etc) interface ....
      // console.log(roles)
      return loadRolesSuccess({ roles })
    })
  ))

  addNewRole$ = createEffect(() => this.actions$.pipe(
    ofType(addNewRole),
    concatMap((action) => this.roleService.rolesControllerCreate(action.role)),
    map((role) => {
      // console.log(role);
      return addNewRoleSuccess({ role })
    })
  ))

  updateRole$ = createEffect(() => this.actions$.pipe(
    ofType(updateRole),
    concatMap(({ update }) => this.roleService.rolesControllerUpdate(update.id as string, update.changes)),
    map((role: any) => {
      // console.log(role);
      return updateRoleSuccess({ role })
    })
  ))

  deleteRole$ = createEffect(() => this.actions$.pipe(
    ofType(deleteRole),
    concatMap(({ id }) => this.roleService.rolesControllerDelete(id)),
    map((role: any) => {
      console.log(role);
      return deleteRoleSuccess({ role })
    })
  ))

  constructor(private actions$: Actions, private roleService: RolesCRUDService) { }

}