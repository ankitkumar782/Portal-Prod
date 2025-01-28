import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FSearchPage } from './f-search.page';

const routes: Routes = [
  {
    path: '',
    component: FSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FSearchPageRoutingModule {}
