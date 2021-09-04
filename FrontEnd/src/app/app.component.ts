import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './shared/store';
import { loginSuccess } from './shared/store/actions/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly _store: Store<AppState>,
  ) { }

  ngOnInit() {
    const access_token: string = localStorage.getItem('access_token')!;
    if (access_token) this._store.dispatch(loginSuccess({ token: { access_token } }));
  }
}
