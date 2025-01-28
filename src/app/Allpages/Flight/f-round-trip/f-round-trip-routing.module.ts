import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FRoundTripPage } from './f-round-trip.page';

const routes: Routes = [
  {
    path: '',
    component: FRoundTripPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FRoundTripPageRoutingModule {}
