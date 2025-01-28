import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FRefundHistoryPage } from './f-refund-history.page';

const routes: Routes = [
  {
    path: '',
    component: FRefundHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FRefundHistoryPageRoutingModule {}
