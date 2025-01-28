import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MannualReissuePage } from './mannual-reissue.page';

const routes: Routes = [
  {
    path: '',
    component: MannualReissuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MannualReissuePageRoutingModule {}
