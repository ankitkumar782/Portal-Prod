import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FBookingHistoryPage } from './f-booking-history.page';

const routes: Routes = [
  {
    path: '',
    component: FBookingHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FBookingHistoryPageRoutingModule {}
