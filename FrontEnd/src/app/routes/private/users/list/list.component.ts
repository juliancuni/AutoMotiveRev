import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto, RoleDto, RolesCRUDService, UsersCRUDService } from 'src/app/shared/sdk';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users$: Observable<UserDto[]>;
  roles$: Observable<RoleDto[]>;
  userModalRef?: BsModalRef;
  user?: UserDto;
  constructor(
    private readonly userService: UsersCRUDService,
    private readonly roleService: RolesCRUDService,
    private modalService: BsModalService,
  ) {
    this.users$ = this.userService.usersControllerFindAll(1, 10, ['roles'], JSON.stringify({})).pipe(
      map((users$: any) => users$.items)
    );
    this.roles$ = this.roleService.rolesControllerFindAll();
  }

  openUserModal(user?: UserDto) {
    const initialState = {
      user,
      roles$: this.roles$,
    };
    this.userModalRef = this.modalService.show(UserModalComponent, { initialState });
    this.userModalRef.content.closeBtnName = 'Close';
  }

  deleteUser(user: UserDto) {
    console.log(user)
    this.userService.usersControllerDeleteUser(user.id!).subscribe()
  }

  deleteRole(role: RoleDto) {
    console.log(role)
    this.roleService.rolesControllerDelete(role.id!).subscribe()
  }


  ngOnInit(): void {
  }

}
