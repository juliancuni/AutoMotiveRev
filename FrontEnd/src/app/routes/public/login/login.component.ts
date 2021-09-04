import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store';
import { login } from 'src/app/shared/store/actions/auth.actions';
// import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  valForm: FormGroup;

  constructor(
    public readonly fb: FormBuilder,
    private readonly _store: Store<AppState>,
  ) {

    this.valForm = this.fb.group({
      'identity': ["root", Validators.required],
      'password': ["36638833", Validators.required]
    });

  }

  submitLogin($ev: any, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      this._store.dispatch(login({ loginDto: this.valForm.value }))
    }
  }

  ngOnInit() {

  }

}
