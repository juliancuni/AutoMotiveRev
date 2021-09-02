import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { RoleDto, RolesCRUDService } from 'src/app/shared/sdk';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class RoleModalComponent implements OnInit {

  public roleForm: FormGroup;
  constructor(
    private readonly roleService: RolesCRUDService,
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
      this.roleService.rolesControllerCreate(role).subscribe((res) => console.log(res));
    }
  }

  ngOnInit(): void {
    this.roleModalRef.setClass("modal-md");
  }
}
