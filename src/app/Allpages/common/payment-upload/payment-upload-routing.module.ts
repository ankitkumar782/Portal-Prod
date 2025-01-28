import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentUploadPage } from './payment-upload.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentUploadPageRoutingModule {}
