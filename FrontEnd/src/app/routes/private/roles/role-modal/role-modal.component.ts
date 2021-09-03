import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RoleDto } from 'src/app/shared/sdk';
import { addNewRole, updateRole } from 'src/app/shared/store/actions/role.actions';
import { RoleState } from 'src/app/shared/store/reducers/role.reducer';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class RoleModalComponent implements OnInit {

  public roleForm: FormGroup;
  role?: RoleDto;
  roleModalTitle?: string;
  update: boolean = false;

  constructor(
    private readonly store: Store<RoleState>,
    public roleModalRef: BsModalRef,
    private fb: FormBuilder
  ) {
    this.roleForm = fb.group({
      'role': fb.control(null, Validators.required),
      'desc': fb.control(null),
    })
  }

  submitRoleForm() {
    for (let c in this.roleForm.controls) {
      this.roleForm.controls[c].markAsTouched();
    }
    if (this.roleForm.valid) {
      const role: RoleDto = this.roleForm.value;
      const update: Update<RoleDto> = { id: role.id!, changes: role }

      this.update ? this.store.dispatch(updateRole({ update })) : this.store.dispatch(addNewRole({ role }));
      this.roleModalRef.hide();
      this.roleForm.reset();
    }
  }

  ngOnInit(): void {
    this.roleModalRef.setClass("modal-md");
    this.roleForm.controls['role'].setValue(this.role?.role);
    this.roleForm.controls['desc'].setValue(this.role?.desc);
    this.roleModalTitle = this.role ? `Edit Role ${this.role.role}` : "Krijo Role";
  }
}
