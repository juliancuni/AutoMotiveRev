import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RoleDto, UserDto } from 'src/app/shared/sdk';
import { loadRoles } from 'src/app/shared/store/actions/role.actions';
import { addNewUser, updateUser } from 'src/app/shared/store/actions/user.actions';
import { UserState } from 'src/app/shared/store/reducers/user.reducer';
import { selectAllRoles } from 'src/app/shared/store/selectors/role.selectors';
import { RoleModalComponent } from '../../roles/role-modal/role-modal.component';

@Component({
    selector: 'app-user-modal',
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

    user?: UserDto;     /** Vjen Nga user List */
    userRoles: RoleDto[] = [];  /** E krijoj ketu */
    allRoles: any[] = [];   /** E krijoj ketu */
    roleModalRef?: BsModalRef;  /** Vjen Nga user List */
    userModalTitle: string = "Error Title!";    /** Vjen Nga user List */
    update: boolean = false;    /** E krijoj ketu */
    userForm!: FormGroup;   /** E krijoj ketu */

    constructor(
        private readonly _store: Store<UserState>,
        private readonly _modalService: BsModalService,
        public userModalRef: BsModalRef,
        private readonly _fb: FormBuilder
    ) { }

    submitUserForm() {
        for (let c in this.userForm.controls) {
            this.userForm.controls[c].markAsTouched();
        }
        if (this.userForm.valid && !this.userForm.pristine) {
            const formValues = this.userForm.value;
            /** Nese nuk eshte percaktuar password fshije nga formValues */
            if (!formValues.password) delete formValues.password;
            /** Shto userRoles ne formValue (userRoles jane manipuluar ne onCheckboxRoleChange)  */
            formValues.roles = this.userRoles;
            /** Bej nje kopje te this.user dhe zevendeso vlerat origjinale me formValue */
            const user: UserDto = { ...this.user, ...formValues };
            /** Krijo nje update Obj (ngrx update object) */
            const update: Update<UserDto> = { id: user.id!, changes: formValues };
            /** Kontrollo nese eshte per update apo per create */
            console.log(user)
            this.update ? this._store.dispatch(updateUser({ update })) : this._store.dispatch(addNewUser({ user }));
        }
        /** Mbyll modal */
        this.userModalRef.hide();
        /** Reset userForm */
        this.userForm.reset();
    }
    /** Hap modal per te krijuar nje rol te ri */
    openRoleModal() {
        this.roleModalRef = this._modalService.show(RoleModalComponent);
    }
    /** Kur te ndryshoje lista e roleve ne form */
    onRoleChange() {
        this.userForm.markAsDirty();
        let userRolesTmp = (this.userRoles) ? [...this.userRoles]: [];
        this.allRoles.map((role) => {
            if (role && role.isSelected) {
                let userRole = { ...role };
                delete userRole.isSelected;
                userRolesTmp ? userRolesTmp : userRolesTmp = [];
                userRolesTmp = [...userRolesTmp, userRole];
            }
            if (role && !role.isSelected) {
                let index = userRolesTmp.map((r) => r.id).indexOf(role.id);
                if (index > -1) userRolesTmp.splice(index);
            }
            this.userRoles = [...userRolesTmp]
        })
    }

    /** Reset password on update */
    resetPassword() {
        alert("Ne Ndertim");
        console.log(this.user?.email)
    }

    ngOnInit(): void {
        /** Dispatch loadRoles. Duhet ne start */
        this._store.dispatch(loadRoles());
        /** Nese ka ardhur user obj nga user-list this.update = true */
        this.user ? this.update = true : this.update = false;
        /** ngx-bootstrap modal styling */
        this.userModalRef.setClass("modal-md");
        /** Krijo formen */
        this.userForm = this._fb.group({
            username: [this.user?.username, Validators.required],
            password: [{ value: null, disabled: this.update ? true : false }, this.update ? null : Validators.required],
            email: [this.user?.email, Validators.required],
            phone: [this.user?.phone, Validators.required],
            docId: [this.user?.docId],
            emer: [this.user?.emer],
            mbiemer: [this.user?.mbiemer],
            alias: [this.user?.alias],
            photo: [this.user?.photo],
            address: [this.user?.address],
        })
        /** Title bazuar mbi user obj qe vjen nga user-list */
        this.userModalTitle = this.user ? `Edit User ${this.user.emer} ${this.user.mbiemer}: ${this.user.username}` : "Krijo User te ri";
        /** Popullo this.userRoles e cila na duhet per manipulim */
        this.userRoles = this.user?.roles!;
        /** Manipulo this.allRoles, shto isSelected property */
        this._store.pipe(select(selectAllRoles)).subscribe((allRoles: any[]) => {
            this.allRoles = allRoles.map((role) => {
                let roleManipulated = { ...role, isSelected: false };
                this.user?.roles?.map((userRole) => {
                    if (role.id === userRole.id) {
                        roleManipulated.isSelected = true;
                    }
                })
                return roleManipulated;
            })
        });
    }

    generateNewRandomPassword() {
        let length = 8,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        this.userForm.controls.password.setValue(retVal, { emitEvent: false });
        return retVal;
    }
}
