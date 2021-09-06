import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../store';
import { isAuthenticated } from '../store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {

  constructor(
    private readonly _store: Store<AppState>,
    private readonly _router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this._store.pipe(
      select(isAuthenticated),
      map(isAuthenticated => {
        if (isAuthenticated) {
          this._router.navigateByUrl('/app');
          return false;
        }
        return true;
      })
    )
    // return true;
  }
}
