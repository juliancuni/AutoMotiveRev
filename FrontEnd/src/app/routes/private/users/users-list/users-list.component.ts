import { Component, OnInit, TemplateRef } from '@angular/core';
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
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users$: Observable<UserDto[]>;
  modalRef?: BsModalRef;
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
    this.modalRef = this.modalService.show(UserModalComponent, { initialState });
    this.modalRef.content.closeBtnName = 'Close';
  }

  openDeleteConfirm(template: TemplateRef<any>, user: UserDto) {
    this.user = user;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmDeleteUser(): void {
    this.store.dispatch(deleteUser({ id: this.user?.id as string }))
    this.modalRef?.hide();
  }

  cancelDelete(): void {
    this.modalRef?.hide();
  }

  deleteRole(role: RoleDto) {
    console.log(role)
  }


  ngOnInit(): void {
  }

}
