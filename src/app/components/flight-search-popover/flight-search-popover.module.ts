import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormShareModule } from '../../form-share/form-share.module';
import { FlightSearchPopoverComponent } from './flight-search-popover.component'
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FlightSearchPopoverComponent],
  imports: [
    CommonModule,
    FormShareModule,
    IonicModule
  ],
  exports: [FlightSearchPopoverComponent],

})
export class FlightSearchPopoverModule {

}