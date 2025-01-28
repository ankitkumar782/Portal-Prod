import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MannualActionReportPage } from './mannual-action-report.page';

const routes: Routes = [
  {
    path: '',
    component: MannualActionReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MannualActionReportPageRoutingModule {}
