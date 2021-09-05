import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { catchError, concatMap, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService, UsersCRUDService } from '../../sdk';
import { login, loginSuccess, logout, saveToLocalStorage, whoAmI, whoAmIFailure, whoAmISuccess } from '../actions/auth.actions';
import { toastrError } from '../actions/ui.actions';



@Injectable()
export class AuthEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    exhaustMap(({ loginDto }) =>
      this._authService.authControllerLogin(loginDto).pipe(
        concatMap(token => {
          return [
            loginSuccess({ token }),
            saveToLocalStorage({ token })
          ]
        }),
        catchError(({ error }) => {
          console.log(error)
          if (!error.statusCode) error = { statusCode: "Error", message: "Server mund te jete down. Lajmero administratorin" }

          return of(toastrError({ error }))
        })
      )
    ))
  );

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
    }),
    catchError(error => {
      console.log(error)
      return of(toastrError({ error }))
    })
  ));

  constructor(
    private actions$: Actions,
    private readonly _authService: AuthenticationService,
    private readonly _router: Router,
    private readonly _userService: UsersCRUDService,
  ) { }

}
