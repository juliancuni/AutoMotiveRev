import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RoleEffects } from 'src/app/shared/store/effects/role.effects';
import { roleFeatureKey, roleReducer } from 'src/app/shared/store/reducers/role.reducer';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesResolver } from 'src/app/shared/store/resolvers/roles.resolver';

const routes: Routes = [
  { path: '', component: RolesListComponent, resolve: { roles: RolesResolver } }
];

@NgModule({
  declarations: [
    RolesListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature(roleFeatureKey, roleReducer),
    EffectsModule.forFeature([RoleEffects])
  ],
  providers: [RolesResolver]
})
export class RolesModule { }
