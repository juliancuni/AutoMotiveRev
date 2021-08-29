import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Role, UserWithRelations } from 'src/app/shared/sdk1/models';
import { RoleControllerService, UserControllerService } from 'src/app/shared/sdk1/services';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users$: Observable<UserWithRelations[]>;
  roles$: Observable<Role[]>;
  userModalRef?: BsModalRef;
  user?: UserWithRelations;
  constructor(
    private readonly userService: UserControllerService,
    private readonly roleService: RoleControllerService,
    private modalService: BsModalService,
  ) {
    this.users$ = this.userService.find({ filter: JSON.stringify({ 'include': ['roles'] }) });
    this.roles$ = this.roleService.find();
  }

  openUserModal(user?: UserWithRelations) {
    const initialState = {
      user,
      roles$: this.roles$,
    };
    this.userModalRef = this.modalService.show(UserModalComponent, { initialState });
    this.userModalRef.content.closeBtnName = 'Close';
  }


  ngOnInit(): void {
  }

}
