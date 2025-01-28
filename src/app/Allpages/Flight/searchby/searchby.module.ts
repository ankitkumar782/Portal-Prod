import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchbyPageRoutingModule } from './searchby-routing.module';

import { SearchbyPage } from './searchby.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SearchbyPageRoutingModule
  ],
  declarations: [SearchbyPage]
})
export class SearchbyPageModule {}
