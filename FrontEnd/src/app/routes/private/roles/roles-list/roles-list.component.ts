import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RoleDto } from 'src/app/shared/sdk';
import { RoleState } from 'src/app/shared/store/reducers/role.reducer';
import { selectAllRoles } from 'src/app/shared/store/selectors/role.selectors';
import { RoleModalComponent } from '../role-modal/role-modal.component';
import { deleteRole } from 'src/app/shared/store/actions/role.actions';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {

  roles$: Observable<RoleDto[]>;
  role?: RoleDto;
  modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private store: Store<RoleState>,
  ) {
    this.roles$ = this.store.pipe(select(selectAllRoles))
  }

  openRoleModal(role?: RoleDto) {
    const initialState = {
      role,
    };
    this.modalRef = this.modalService.show(RoleModalComponent, { initialState });
    this.modalRef.content.closeBtnName = 'Close';
  }

  openDeleteConfirm(template: TemplateRef<any>, role: RoleDto) {
    this.role = role;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmDeleteRole() {
    this.store.dispatch(deleteRole({ id: this.role?.id as string }));
    this.modalRef?.hide();
  }

  cancelDelete() {
    this.modalRef?.hide();
  }

  ngOnInit(): void {
  }

}
