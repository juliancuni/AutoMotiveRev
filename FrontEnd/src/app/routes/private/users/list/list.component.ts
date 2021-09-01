import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { UserDto, RoleDto, RolesCRUDService } from 'src/app/shared/sdk';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { select, Store } from '@ngrx/store';
import { UserState } from 'src/app/shared/store/reducers/user.reducer';
import { selectAllUsers } from 'src/app/shared/store/selectors/user.selectors';
import { map, tap } from 'rxjs/operators';
import { deleteUser } from 'src/app/shared/store/actions/user.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users$: Observable<UserDto[]>;
  userModalRef?: BsModalRef;
  user?: UserDto;
  constructor(
    private modalService: BsModalService,
    private readonly store: Store<UserState>,

  ) {
    this.users$ = this.store.pipe(select(selectAllUsers));
  }

  openUserModal(user?: UserDto) {
    const initialState = {
      user,
    };
    this.userModalRef = this.modalService.show(UserModalComponent, { initialState });
    this.userModalRef.content.closeBtnName = 'Close';
  }

  deleteUser(user: UserDto) {
    this.store.dispatch(deleteUser({ id: user.id as string }))
  }

  deleteRole(role: RoleDto) {
    console.log(role)
  }


  ngOnInit(): void {
  }

}
