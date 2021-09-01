import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { finalize, first, tap } from 'rxjs/operators';
import { loadUsers } from '../actions/user.actions';
import { UserState } from '../reducers/user.reducer';

@Injectable()
export class UsersResolver implements Resolve<any> {

    private loading = false;

    constructor(private store: Store<UserState>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store.pipe(
            tap(() => {
                if (!this.loading) {
                    this.loading = true;
                    this.store.dispatch(loadUsers());
                }
            }),
            first(),
            finalize(() => this.loading = false)
        );
    }

}