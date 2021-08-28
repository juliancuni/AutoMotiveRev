import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateModule } from './private/private.module';
import { PublicModule } from './public/public.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrivateModule,
    PublicModule,
  ],
  exports: [
    PrivateModule,
    PublicModule,
  ],
})
export class LayoutModule { }
