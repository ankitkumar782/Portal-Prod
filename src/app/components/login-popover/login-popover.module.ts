import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormShareModule } from '../../form-share/form-share.module';
import { LoginPopoverComponent } from './login-popover.component'
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [LoginPopoverComponent],
  imports: [
    CommonModule,
    FormShareModule,
    IonicModule
  ],
  exports: [LoginPopoverComponent],

})
export class LoginPopoverModule {

}