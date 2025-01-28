import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController ,PopoverController} from '@ionic/angular';
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


  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LoginPopoverComponent,
      event: ev,
      cssClass: 'popover_setting',
      translucent: false,
      mode: 'ios',
    });
    popover.onDidDismiss().then((modelData) => {
      // if (modelData.data.cred1 !== "" && modelData.data.cred2 !== "" && modelData.data.cred3 !== "") {
      //   this.present()
      //   this.lgn = {
      //     "TYPE": "AUTH",
      //     "NAME": "GET_AUTH_TOKEN",
      //     "STR": [
      //       {
      //         "A_ID": modelData.data.cred1,
      //         "U_ID": modelData.data.cred2,
      //         "PWD": modelData.data.cred3,
      //         "MODULE": "B2B",
      //         "HS": "D"
      //       }
      //     ]
      //   }
        // this.post_service.POST("http://nauth.ksofttechnology.com/API/AUTH", this.lgn).pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
        //   if (result.STATUS == "SUCCESS") {
        //     this.rout.navigate(['home/fsearch'])
        //     sessionStorage.setItem("Token", result.RESULT)
        //     this.dismiss()
        //   }
        //   else {
        //     this.dismiss()
        //     this.tost_srvice.presentToast("Wrong Credentials")
        //   }

        // }, error => {
        //   this.dismiss()
        //   console.log(error)
        //   alert("Internal Server Error")
        // });
      // }
      // else {
      //   this.dismiss()
      //   this.tost_srvice.presentToast("Fields can,t be blank")
      // }
    });
    return await popover.present();
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
