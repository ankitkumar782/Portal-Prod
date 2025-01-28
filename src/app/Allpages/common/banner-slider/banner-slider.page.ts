import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-slider',
  templateUrl: './banner-slider.page.html',
  styleUrls: ['./banner-slider.page.scss'],
})
export class BannerSliderPage implements OnInit {
  slideOpts = {
    autoplay: true,
    initialSlide: 0,
    speed: 1000,
    effect: 'flip',
  };
  constructor() { }

  ngOnInit() {
  }

}
