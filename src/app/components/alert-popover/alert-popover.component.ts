import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-alert-popover',
  templateUrl: './alert-popover.component.html',
  styleUrls: ['./alert-popover.component.scss'],
})
export class AlertPopoverComponent implements OnInit {

  constructor(public popoverController: PopoverController, private navParams: NavParams) { }
  Id: any
  src:any
  des:any
  ngOnInit() {
    this.Id = this.navParams.data['paramID'];
    this.src=this.navParams.data['s']
    this.des=this.navParams.data['d']
  }

  async navigate() {
    await this.popoverController.dismiss();
  }
}
