import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserModalComponent } from './user-modal/user-modal.component';
import { RoleModalComponent } from './role-modal/role-modal.component';
import { StoreModule } from '@ngrx/store';
import { userFeatureKey, userReducer } from 'src/app/shared/store/reducers/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../../../shared/store/effects/user.effects';
import { UsersResolver } from 'src/app/shared/store/resolvers/users.resolver';

const routes: Routes = [
  { path: '', component: ListComponent, resolve: { users: UsersResolver } }
]

@NgModule({
  declarations: [
    ListComponent,
    UserModalComponent,
    RoleModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature(userFeatureKey, userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [
    UsersResolver,
  ]
})
export class UsersModule { }
