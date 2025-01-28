import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FPaxPageRoutingModule } from './f-pax-routing.module';

import { FPaxPage } from './f-pax.page';
import { FormShareModule } from '../../../form-share/form-share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FPaxPageRoutingModule,
    FormShareModule,
    ReactiveFormsModule
    
  ],
  declarations: [FPaxPage]
})
export class FPaxPageModule {}
