import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrivateHeaderComponent } from './private-header/private-header.component';
import { PrivateFooterComponent } from './private-footer/private-footer.component';
import { PrivateSidebarComponent } from './private-sidebar/private-sidebar.component';
import { PrivateOffsidebarComponent } from './private-offsidebar/private-offsidebar.component';
import { UserblockComponent } from './userblock/userblock.component';



@NgModule({
  declarations: [
    PrivateLayoutComponent,
    PrivateHeaderComponent,
    PrivateFooterComponent,
    PrivateSidebarComponent,
    PrivateOffsidebarComponent,
    UserblockComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

  ],
  exports: [
    PrivateLayoutComponent,
    PrivateHeaderComponent,
    PrivateFooterComponent,
    PrivateSidebarComponent,
    PrivateOffsidebarComponent
  ]
})
export class PrivateLayoutModule { }
