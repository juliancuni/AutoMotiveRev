import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store';
import { logout } from 'src/app/shared/store/actions/auth.actions';

@Component({
  selector: 'app-private-header',
  templateUrl: './private-header.component.html',
  styleUrls: ['./private-header.component.scss']
})
export class PrivateHeaderComponent implements OnInit {

  constructor(
    private readonly _store: Store<AppState>
  ) { }

  logout() {
    this._store.dispatch(logout());
  }

  ngOnInit(): void {
  }

}
