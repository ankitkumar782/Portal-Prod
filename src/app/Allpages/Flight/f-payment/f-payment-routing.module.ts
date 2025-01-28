import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FPaymentPage } from './f-payment.page';

const routes: Routes = [
  {
    path: '',
    component: FPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FPaymentPageRoutingModule {}
