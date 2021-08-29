import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Role, RoleControllerService, User, UserControllerService } from 'src/app/shared/sdk';
import { RoleModalComponent } from '../role-modal/role-modal.component';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  user?: User;
  roles$?: Observable<Role[]>;
  roleModalRef?: BsModalRef;
  userModalTitle?: string;
  public userForm: FormGroup;

  constructor(
    private readonly userService: UserControllerService,
    private readonly roleService: RoleControllerService,
    private readonly modalService: BsModalService,
    public userModalRef: BsModalRef,
    private fb: FormBuilder
  ) {
    this.userForm = fb.group({
      'username': fb.control(this.user?.username, Validators.required),
      'password': fb.control(this.user?.password, Validators.required),
    })
  }

  submitUserForm() {
    for (let c in this.userForm.controls) {
      this.userForm.controls[c].markAsTouched();
    }

    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      this.userService.userControllerCreate(user).subscribe((res) => console.log(res));
    }
  }

  openRoleModal() {
    this.roleModalRef = this.modalService.show(RoleModalComponent);
  }

  ngOnInit(): void {
    this.userModalRef.setClass("modal-md");
    this.userForm.controls['username'].setValue(this.user?.username);
    this.userForm.controls['password'].setValue(this.user?.password);
    this.userModalTitle = this.user ? `Edit User ${this.user.username}` : "Krijo User te ri";
  }

}
