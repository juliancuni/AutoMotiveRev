import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { MenuService } from '../shared/services/menu.service';
import { menu } from './menu';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes),
  ]
})
export class RoutesModule {
  constructor(menuService: MenuService) {
    menuService.addMenu(menu);
  }
}
