import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FPaymentPageRoutingModule } from './f-payment-routing.module';

import { FPaymentPage } from './f-payment.page';
import {PaymentModule} from '../../../components/payment/payment.module';
// import { FormShareModule } from 'src/app/form-share/form-share.module';
import { FlightTicketModule } from '../../../components/flight-ticket/fight-ticket.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FPaymentPageRoutingModule,
    // FormShareModule
    PaymentModule,
    FlightTicketModule

  ],
  declarations: [FPaymentPage]
})
export class FPaymentPageModule {}
