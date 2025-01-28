import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MannualActionReportPageRoutingModule } from './mannual-action-report-routing.module';

import { MannualActionReportPage } from './mannual-action-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MannualActionReportPageRoutingModule
  ],
  declarations: [MannualActionReportPage]
})
export class MannualActionReportPageModule {}
