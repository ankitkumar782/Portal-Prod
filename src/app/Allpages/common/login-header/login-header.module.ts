import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginHeaderPageRoutingModule } from './login-header-routing.module';

import { LoginHeaderPage } from './login-header.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
   
    LoginHeaderPageRoutingModule
  ],
  declarations: [LoginHeaderPage]
})
export class LoginHeaderPageModule {}
