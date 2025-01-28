import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ToastController, LoadingController } from '@ionic/angular';
import { LoginPopoverComponent } from '../../../components/login-popover/login-popover.component';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  constructor(
    public rout: Router,
    public popoverController: PopoverController,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) { }
  slideOpts = {
    autoplay: true,
    initialSlide: 0,
    speed: 500,
    effect: 'flip',
  };
  ngOnInit() { }
  none = false;

  public appPages = [
    { title: 'Login', url: '/home', icon: 'log-in' },
    { title: 'Signup', url: '/home', icon: 'log-out' },
    { title: 'About Us', url: '/about', icon: 'people' },
    { title: 'Contact Us', url: '/contact', icon: 'call' },
    { title: 'Payment Uplaod', url: '/gallery', icon: 'images' },
  ];
  modelData_data: any;

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LoginPopoverComponent,
      event: ev,
      cssClass: 'popover_setting',
      translucent: false,
      mode: 'ios',
    });

    popover.onDidDismiss().then((modelData) => {
      if (modelData.data.cre1 !== "" && modelData.data.cre2 !== "" && modelData.data.cre3 !== "") {
        this.present()
        if (modelData.data.cre1 == "18785869" && modelData.data.cre2 == "pslv" && modelData.data.cre3 == "111000") {
          this.dismiss()
          this.rout.navigate(['home/dashboard'])
        }
        else {
          this.presentToast()
          this.dismiss()
        }
      }
      else if (modelData.data.cre1 == "" || modelData.data.cre2 == "" || modelData.data.cre3 == "") {
        this.dismiss()
      }

    });
    return await popover.present();
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Wrong Credentials',
      duration: 3000,
    });
    toast.present();
  }

  isLoading = false;


  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Please wait...',
      mode: 'ios',
      backdropDismiss: false,
      spinner: 'bubbles'
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }


  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
  index() {
    this.rout.navigate(['/index'])
      .then(() => {
        window.location.reload();
      });
    // window.location.replace('/index')
  }
  aboutus() {
    this.rout.navigate(['/aboutus'])
      .then(() => {
        window.location.reload();
      });
    //window.location.replace('/aboutus')
  }
  contactus() {
    this.rout.navigate(['/contactus'])
      .then(() => {
        window.location.reload();
      });
    //window.location.replace('/contactus')
  }

  info = " We have closed our Standard Chartered, Yes Bank, State Bank of India, Punjab National and Kotak Mahindra bank account. Please check before making payment."
  office_loction = [
    {
      location_name: "Delhi Office",
      address: "10185-C, Arya Samaj Road,Karol Bagh,",
      state: "New Delhi",
      pincode: "110005",
      mobile: "+91 8587855513",
      phone: "011-45022261/62/63/64/65/66/67",
      email: "support@kafilatravel.in"
    },
    {
      location_name: "Noida  Office",
      address: "C-36 Sector-2,",
      state: "Noida, U.P",
      pincode: "",
      mobile: "",
      phone: "0120-4174630-38",
      email: "ncr@kafilatravel.com"
    },
    {
      location_name: "Mumbai  Office",
      address: "Shop No 5, Ground Floor, Shah Appartment Co-operative Society,Marol Maroshi Road, Andheri(E)",
      state: "Mumbai",
      pincode: "400059",
      mobile: "+91 9967561778",
      phone: "022-67195555",
      email: "tkt.mumbai@lowcostticket.in, accounts@lowcostticket.in  "
    }


  ]
  bank = [
    {
      bankName: "Union Bank of India",
      AcName: "Kafila Hospitality And Travels Pvt Ltd",
      AcNo: "307904060000001",
      Branch: "Karol Bagh, New Delhi - 110005",
      IFSCCode: "UBIN0530794",
      Info: "(Please don't deposit cash more than Rs 40000 | Plz prefer this account for NEFT/RTGS/Transfer)",
      img:"../assets/UBI.png"
    }
  ]
}
