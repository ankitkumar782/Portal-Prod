import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SeatSelectionComponent } from './seat-selection.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [SeatSelectionComponent],
  exports: [SeatSelectionComponent]
})
export class SeatSelectionModule { } 