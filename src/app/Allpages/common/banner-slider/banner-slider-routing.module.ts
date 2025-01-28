import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BannerSliderPage } from './banner-slider.page';

const routes: Routes = [
  {
    path: '',
    component: BannerSliderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BannerSliderPageRoutingModule {}
