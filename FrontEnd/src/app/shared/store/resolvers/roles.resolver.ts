import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { finalize, first, map, tap } from 'rxjs/operators';
import { AppState } from '..';
import { loadRoles } from '../actions/role.actions';

@Injectable()
export class RolesResolver implements Resolve<any> {

    private loading = false;

    constructor(private store: Store<AppState>) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.store.pipe(
            map((store: any) => {
                if (!this.loading) {
                    if (!store.roles || store.roles.ids.length === 0) {
                        this.loading = true;
                        this.store.dispatch(loadRoles());
                    }
                }
            }),
            first(),
            finalize(() => this.loading = false)
        );
    }

}