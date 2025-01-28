import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FPaymentHistoryPageRoutingModule } from './f-payment-history-routing.module';

import { FPaymentHistoryPage } from './f-payment-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FPaymentHistoryPageRoutingModule
  ],
  declarations: [FPaymentHistoryPage]
})
export class FPaymentHistoryPageModule {}
