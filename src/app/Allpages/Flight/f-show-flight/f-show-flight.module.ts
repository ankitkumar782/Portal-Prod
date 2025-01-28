import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FShowFlightPageRoutingModule } from './f-show-flight-routing.module';

import { FShowFlightPage } from './f-show-flight.page';
import { FormShareModule } from '../../../form-share/form-share.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FShowFlightPageRoutingModule,
    FormShareModule
  ],
  declarations: [FShowFlightPage]
})
export class FShowFlightPageModule {}
