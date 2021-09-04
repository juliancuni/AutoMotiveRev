import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService, UsersCRUDService } from '../../sdk';
import { login, loginSuccess, logout, saveToLocalStorage, whoAmI, whoAmISuccess } from '../actions/auth.actions';



@Injectable()
export class AuthEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    concatMap(({ loginDto }) => this._authService.authControllerLogin(loginDto)),
    switchMap((token) => {
      return [
        loginSuccess({ token }),
        saveToLocalStorage({ token })
      ]
    })
  ));

  saveToLocalStorage$ = createEffect(() => this.actions$.pipe(
    ofType(saveToLocalStorage),
    tap(({ token }) => {
      localStorage.setItem('access_token', token.access_token);
      this._router.navigateByUrl("/app");
    })
  ), { dispatch: false });

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    tap(() => {
      localStorage.removeItem('access_token');
      this._router.navigateByUrl("/login");
    })
  ), { dispatch: false });


  whoAmI$ = createEffect(() => this.actions$.pipe(
    ofType(whoAmI),
    concatMap(() => this._userService.usersControllerWhoAmI()),
    map((myUser) => {
      return whoAmISuccess({ myUser })
    })
  ));

  constructor(
    private actions$: Actions,
    private readonly _authService: AuthenticationService,
    private readonly _router: Router,
    private readonly _userService: UsersCRUDService,
  ) { }

}
