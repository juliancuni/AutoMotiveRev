import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/shared/sdk';
import { AppState } from 'src/app/shared/store';
import { whoAmI } from 'src/app/shared/store/actions/auth.actions';
import { myUser } from 'src/app/shared/store/selectors/auth.selectors';

@Component({
  selector: 'app-userblock',
  templateUrl: './userblock.component.html',
  styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {

  myUser$: Observable<UserDto>;
  constructor(
    private readonly _store: Store<AppState>,
  ) {
    this._store.dispatch(whoAmI());
    this.myUser$ = this._store.pipe(select(myUser)) as Observable<UserDto>;
  }

  ngOnInit(): void {

  }

}
