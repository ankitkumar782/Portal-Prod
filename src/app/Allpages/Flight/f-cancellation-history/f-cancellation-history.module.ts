import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FCancellationHistoryPageRoutingModule } from './f-cancellation-history-routing.module';

import { FCancellationHistoryPage } from './f-cancellation-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FCancellationHistoryPageRoutingModule
  ],
  declarations: [FCancellationHistoryPage]
})
export class FCancellationHistoryPageModule {}
