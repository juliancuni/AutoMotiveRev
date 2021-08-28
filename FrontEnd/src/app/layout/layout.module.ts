import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateLayoutModule } from './private/private-layout.module';
import { PublicLayoutModule } from './public/public-layout.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrivateLayoutModule,
    PublicLayoutModule,
  ],
  exports: [
    PrivateLayoutModule,
    PublicLayoutModule,
  ],
})
export class LayoutModule { }
