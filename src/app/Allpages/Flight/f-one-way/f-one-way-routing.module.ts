import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FOneWayPage } from './f-one-way.page';

const routes: Routes = [
  {
    path: '',
    component: FOneWayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FOneWayPageRoutingModule {}
