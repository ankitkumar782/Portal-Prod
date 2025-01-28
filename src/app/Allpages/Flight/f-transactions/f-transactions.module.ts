import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FTransactionsPageRoutingModule } from './f-transactions-routing.module';

import { FTransactionsPage } from './f-transactions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FTransactionsPageRoutingModule
  ],
  declarations: [FTransactionsPage]
})
export class FTransactionsPageModule {}
