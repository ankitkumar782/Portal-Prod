import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormShareModule } from '../../form-share/form-share.module';
import { IonicModule } from '@ionic/angular';
import { AlertPopoverComponent } from '../alert-popover/alert-popover.component'

@NgModule({
  declarations: [AlertPopoverComponent],
  imports: [
    CommonModule,
    FormShareModule,
    IonicModule
  ],
  exports: [AlertPopoverComponent],

})
export class AlertPopoverModule {
   
}