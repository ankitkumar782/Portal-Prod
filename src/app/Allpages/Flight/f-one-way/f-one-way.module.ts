import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FOneWayPageRoutingModule } from './f-one-way-routing.module';
import { FOneWayPage } from './f-one-way.page';
import { FormShareModule } from '../../../form-share/form-share.module';
import{FlightSearchPopoverModule} from '../../../components/flight-search-popover/flight-search-popover.module'
import{AlertPopoverModule}from '../../../components/alert-popover/alert-popover.module'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FOneWayPageRoutingModule,
    FormShareModule,
    FlightSearchPopoverModule,
    AlertPopoverModule
  ],
  declarations: [FOneWayPage]
})
export class FOneWayPageModule {}
