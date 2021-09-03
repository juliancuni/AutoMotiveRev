import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './shared/store';
import { loadRoles } from './shared/store/actions/role.actions';
import { loadUsers } from './shared/store/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private readonly store: Store<AppState>,
  ) {
    this.store.dispatch(loadRoles());
    this.store.dispatch(loadUsers());
  }

}
