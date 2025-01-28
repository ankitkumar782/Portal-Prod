import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormShareModule } from '../../form-share/form-share.module';
import { FlightTicketComponent } from './flight-ticket.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [FlightTicketComponent],
  imports: [
    CommonModule,
    FormShareModule,
    IonicModule,
  
  ],
  exports:[FlightTicketComponent],
  
})
export class FlightTicketModule { }
