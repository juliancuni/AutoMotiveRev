import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserModalComponent } from './user-modal/user-modal.component';
import { RoleModalComponent } from './role-modal/role-modal.component';

const routes: Routes = [
  { path: '', component: ListComponent }
]

@NgModule({
  declarations: [
    ListComponent,
    UserModalComponent,
    RoleModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class UsersModule { }
