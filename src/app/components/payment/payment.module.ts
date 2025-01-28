import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormShareModule } from '../../form-share/form-share.module';
import { PaymentComponent } from './payment.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    FormShareModule,
    IonicModule
  ],
  exports:[PaymentComponent],
  
})
export class PaymentModule { }
