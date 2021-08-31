import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { RoleDto, UserDto, UsersCRUDService } from 'src/app/shared/sdk';
import { RoleModalComponent } from '../role-modal/role-modal.component';

@Component({
    selector: 'app-user-modal',
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

    user?: UserDto;
    roles$?: Observable<RoleDto[]>;
    roleModalRef?: BsModalRef;
    userModalTitle?: string;
    public userForm: FormGroup;

    constructor(
        private readonly userService: UsersCRUDService,
        private readonly modalService: BsModalService,
        public userModalRef: BsModalRef,
        private fb: FormBuilder
    ) {
        this.userForm = fb.group({
            'username': fb.control(this.user?.username, Validators.required),
            'password': fb.control(this.user?.password, Validators.required),
            'email': fb.control(this.user?.email, Validators.required),
            'docId': fb.control(this.user?.docId, Validators.required),
            'emer': fb.control(this.user?.emer, Validators.required),
            'mbiemer': fb.control(this.user?.mbiemer, Validators.required),
            'alias': fb.control(this.user?.alias, Validators.required),
            'photo': fb.control(this.user?.photo, Validators.required),
            'phone': fb.control(this.user?.photo, Validators.required),
            'address': fb.control(this.user?.address, Validators.required),
            'role': fb.control(null, Validators.required),
        })
    }

    submitUserForm() {
        for (let c in this.userForm.controls) {
            this.userForm.controls[c].markAsTouched();
        }
        if (this.userForm.valid) {
            const user: UserDto = this.userForm.value;
            this.userService.usersControllerCreateUser(user).subscribe((res) => console.log(res));
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
