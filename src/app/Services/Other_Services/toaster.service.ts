import { Injectable } from '@angular/core';
import {ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  // toast:any
  constructor(
    public toastController: ToastController
  ) { }

  presentToast(text: string): void {
    let toastData = {
      message: text,
      duration: 4000,
      position: 'bottom',
      color: 'danger'
    }

    this.showToast(toastData);
  }

  private async showToast(data: any): Promise<void> {
    let toast = this.toastController.create(data);
    (await toast).present();
  }
}
