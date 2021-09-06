import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { tap } from "rxjs/operators";
import { toastrError, toastrWarning, toastrSuccess } from "../actions/ui.actions";

@Injectable()
export class UiEffects {

    toastrError$ = createEffect(() => this.actions$.pipe(
        ofType(toastrError),
        tap(({ error }) => this._toastService.error(error.message, error.statusCode))
    ), { dispatch: false });

    toastrWarning$ = createEffect(() => this.actions$.pipe(
        ofType(toastrWarning),
        tap(({ msg }) => this._toastService.warning(msg.message, msg.statusCode))
    ), { dispatch: false });

    toastrSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(toastrSuccess),
        tap(({ msg }) => this._toastService.success(msg.message, msg.statusCode))
    ), { dispatch: false });

    constructor(
        private actions$: Actions,
        private readonly _toastService: ToastrService,
    ) { }
}