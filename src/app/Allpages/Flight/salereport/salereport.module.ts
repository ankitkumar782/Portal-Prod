import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalereportPageRoutingModule } from './salereport-routing.module';

import { SalereportPage } from './salereport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalereportPageRoutingModule
  ],
  declarations: [SalereportPage]
})
export class SalereportPageModule {}
