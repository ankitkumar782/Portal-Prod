import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FPaxPage } from './f-pax.page';

const routes: Routes = [
  {
    path: '',
    component: FPaxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FPaxPageRoutingModule {}
