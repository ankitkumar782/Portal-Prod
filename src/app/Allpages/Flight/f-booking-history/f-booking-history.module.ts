import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FBookingHistoryPageRoutingModule } from './f-booking-history-routing.module';
import { JwPaginationModule } from 'jw-angular-pagination';
import { FBookingHistoryPage } from './f-booking-history.page';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FBookingHistoryPageRoutingModule,
    MatPaginatorModule,
    JwPaginationModule ,
    NgxPaginationModule,
    MatDialogModule,
    MdbModalModule,
    MatSnackBarModule
  ],
  declarations: [FBookingHistoryPage]
})
export class FBookingHistoryPageModule {}
