import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { RoleDto, UserDto, UsersCRUDService } from 'src/app/shared/sdk';
import { addNewUser, updateUser } from 'src/app/shared/store/actions/user.actions';
import { UserState } from 'src/app/shared/store/reducers/user.reducer';
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
    update: boolean = false;

    public userForm: FormGroup;

    constructor(
        private readonly store: Store<UserState>,
        private readonly modalService: BsModalService,
        public userModalRef: BsModalRef,
        private fb: FormBuilder
    ) {
        this.userForm = fb.group({
            'username': fb.control(this.user?.username, Validators.required),
            // 'password': fb.control(this.user?.password, Validators.required),
            'email': fb.control(this.user?.email, Validators.required),
            'phone': fb.control(this.user?.photo, Validators.required),
            'docId': fb.control(this.user?.docId),
            'emer': fb.control(this.user?.emer),
            'mbiemer': fb.control(this.user?.mbiemer),
            'alias': fb.control(this.user?.alias),
            'photo': fb.control(this.user?.photo),
            'address': fb.control(this.user?.address),
            'role': fb.control(null),
        })
    }

    submitUserForm() {

        for (let c in this.userForm.controls) {
            this.userForm.controls[c].markAsTouched();
        }
        if (this.userForm.valid) {
            const user: UserDto = { ...this.user, ...this.userForm.value };
            const update: Update<UserDto> = { id: user.id!, changes: user }
            console.log(this.update)

            this.update ? this.store.dispatch(updateUser({ update })) : this.store.dispatch(addNewUser({ user }));
            this.userModalRef.hide();
            this.userForm.reset();
        }
    }

    openRoleModal() {
        this.roleModalRef = this.modalService.show(RoleModalComponent);
    }

    ngOnInit(): void {
        this.user ? this.update = true : this.update = false;

        this.userModalRef.setClass("modal-md");
        this.userForm.controls['username'].setValue(this.user?.username);
        this.userForm.controls['email'].setValue(this.user?.email);
        this.userForm.controls['phone'].setValue(this.user?.phone);
        this.userForm.controls['docId'].setValue(this.user?.docId);
        this.userForm.controls['emer'].setValue(this.user?.emer);
        this.userForm.controls['mbiemer'].setValue(this.user?.mbiemer);
        this.userForm.controls['alias'].setValue(this.user?.alias);
        this.userForm.controls['photo'].setValue(this.user?.photo);
        this.userForm.controls['address'].setValue(this.user?.address);
        this.userModalTitle = this.user ? `Edit User ${this.user.username}` : "Krijo User te ri";
    }

}
