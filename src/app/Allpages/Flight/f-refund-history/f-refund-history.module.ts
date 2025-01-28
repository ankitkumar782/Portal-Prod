import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FRefundHistoryPageRoutingModule } from './f-refund-history-routing.module';

import { FRefundHistoryPage } from './f-refund-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FRefundHistoryPageRoutingModule
  ],
  declarations: [FRefundHistoryPage]
})
export class FRefundHistoryPageModule {}
