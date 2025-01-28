import { Component, OnInit, ContentChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PostService } from '../../Services/Crud_Services/post.service';
import { ToasterService } from '../../Services/Other_Services/toaster.service';
import { Md5 } from 'ts-md5';
@Component({
  selector: 'app-login-popover',
  templateUrl: './login-popover.component.html',
  styleUrls: ['./login-popover.component.scss'],
})
export class LoginPopoverComponent implements OnInit {
  loader = true
  pstService: any;
  env: string;
  constructor(public popoverController: PopoverController, private post_service: PostService, public rout: Router, public tost_srvice: ToasterService) { }

  ngOnInit() { }
a
  set_cre = new FormGroup({
    cre1: new FormControl('', [Validators.required]),
    cre2: new FormControl('', [Validators.required]),
    cre3: new FormControl('', [Validators.required])
  })

  booleanValue = false
  evv = "D"

  toggle() {
    this.booleanValue = !this.booleanValue
    if (this.booleanValue == true) {
      this.evv = "D"
      // console.log(this.evv)
    }
    else if (this.booleanValue == false){
      this.evv = "P"
      // console.log(this.evv)
    }
  }

  closeModel() {
    this.loader = false
    let data = {
      cred1: this.set_cre.value.cre1,
      cred2: this.set_cre.value.cre2,
      cred3: this.set_cre.value.cre3,
    }

    sessionStorage.setItem("ENV", "P")
    sessionStorage.setItem("url", "https://fhapip.ksofttechnology.com/api")
    
    if (data.cred1 !== "" && data.cred2 !== "" && data.cred3 !== "") {
      let lgn = {
        "TYPE": "AUTH",
        "NAME": "GET_AUTH_TOKEN",
        "STR": [
          {
            "A_ID": data.cred1,
            "U_ID": data.cred2,
            "PWD": data.cred3,
            "MODULE": "B2B",
            "HS": "D"
          }
        ]
      }
      
      this.decode(data.cred2.toUpperCase()+"|"+data.cred3.toUpperCase());
      this.env=sessionStorage.getItem("ENV")
           sessionStorage.setItem("Token",this.passwordMd5)
           sessionStorage.setItem("Agentid",data.cred1)
           let obj={
           "P_TYPE": "API",
           "R_TYPE": "FLIGHT",
           "R_NAME": "FlightAgencyBalance", 
           "AID": data.cred1,
           "MODULE": "B2B",
           "IP": "182.73.146.154",
           "TOKEN": this.passwordMd5,
           "ENV": this.env,
           "Version": "1.0.0.0.0.0"
          }
       
         this.post_service.POST("/FReport", obj).subscribe(res => {
           console.log(res)
           if(res[0]?.Agentid==data.cred1){
            console.log('hello')
            this.rout.navigate(['home/fsearch'])
           }
           else {
            this.loader = true
                 this.tost_srvice.presentToast("Wrong Credentials")
              }
           
         })
    }
    else {

      this.tost_srvice.presentToast("Fields can,t be blank")
    }
  }


  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  passwordMd5
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  decode(password) {
    this.passwordMd5 = Md5.hashStr(password).toString();
    console.log(this.passwordMd5)
  }



}