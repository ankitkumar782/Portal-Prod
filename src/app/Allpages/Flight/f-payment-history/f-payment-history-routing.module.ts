import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FPaymentHistoryPage } from './f-payment-history.page';

const routes: Routes = [
  {
    path: '',
    component: FPaymentHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FPaymentHistoryPageRoutingModule {}
