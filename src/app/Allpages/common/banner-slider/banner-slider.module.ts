import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BannerSliderPageRoutingModule } from './banner-slider-routing.module';

import { BannerSliderPage } from './banner-slider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BannerSliderPageRoutingModule,
    
  ],
  declarations: [BannerSliderPage]
})
export class BannerSliderPageModule {}
