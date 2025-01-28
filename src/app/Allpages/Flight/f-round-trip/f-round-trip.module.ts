import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FRoundTripPageRoutingModule } from './f-round-trip-routing.module';

import { FRoundTripPage } from './f-round-trip.page';
import { FormShareModule } from '../../../form-share/form-share.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FRoundTripPageRoutingModule,
    FormShareModule
  ],
  declarations: [FRoundTripPage]
})
export class FRoundTripPageModule {}
