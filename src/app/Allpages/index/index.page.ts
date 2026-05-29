import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController ,ModalController,PopoverController} from '@ionic/angular';
import { LoginPopoverComponent } from '../../components/login-popover/login-popover.component';
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  constructor(
    public rout: Router,
    public loadingController: LoadingController,
    public popoverController: PopoverController,
    public modalController:ModalController

  ) { }
  slideOpts = {
    autoplay: true,
    initialSlide: 0,
    speed: 1000,
    effect: 'flip',
  };
  ngOnInit() {
    // const encodedData = btoa('Hello, world'); // encode a string        
    // localStorage.setItem("token", encodedData);
    // console.log(encodedData)

    // let accessToken = localStorage.getItem("token");
    // const decodedData = atob(accessToken); // decode the string 
    // console.log(decodedData)   
  }

  isLoading = false;

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Please wait...',
      mode: 'ios',
      backdropDismiss: false,
      spinner: 'bubbles',
      // duration: 2000
    }).then(a => {
      a.present().then(() => {

        if (!this.isLoading) {
          a.dismiss()
        }
      });
    });
  }

  

async presentPopover() {
  const modal = await this.modalController.create({
    component: LoginPopoverComponent,
    cssClass: 'login-modal',
    backdropDismiss: true
  });

  await modal.present();
}

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss()
  }

  // index() {
  //   this.rout.navigate(['/index'])
  // }
  // aboutus() {
  //   this.rout.navigate(['/aboutus'])
  // }
  // contactus() {
  //   this.rout.navigate(['/contactus'])
  // }
  index() {
    this.rout.navigate(['/index'])
      .then(() => {
        window.location.reload();
      });
  }


  aboutus() {
    this.rout.navigate(['/aboutus'])
      .then(() => {
        window.location.reload();
      });
    // window.location.replace('/aboutus')
  }
  contactus() {
    this.rout.navigate(['/contactus'])
      .then(() => {
        window.location.reload();
      });
    //window.location.replace('/contactus')
  }
  payUpload() {
    this.rout.navigate(['/paymentUpload'])
      .then(() => {
        window.location.reload();
      });
  }
  register() {
    this.rout.navigate(['/registration'])
      .then(() => {
        window.location.reload();
      });
  }
  // ngOnDestroy() {
  //   this.unsubscribe$.next(true);
  //   this.unsubscribe$.complete();
  // }

  addedShortly() {
    alert("Will Be Added Shortly")
  }
}
