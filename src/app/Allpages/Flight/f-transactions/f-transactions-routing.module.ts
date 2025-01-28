import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FTransactionsPage } from './f-transactions.page';

const routes: Routes = [
  {
    path: '',
    component: FTransactionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FTransactionsPageRoutingModule {}
