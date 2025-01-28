import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs'
import { Platform } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetService } from '../../Services/Crud_Services/get.service';
import { CommonService } from '../../Services/Other_Services/common.service';
import { PostService } from '../../Services/Crud_Services/post.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  count: any
  Menu: any;
  clickEventSubs: Subscription
  bigMenu = false;
  credTrue = false
  moreOption = true
  constructor(private route: Router, public platform: Platform, private get_service: GetService, private common_service: CommonService, private pstService: PostService) {
    this.clickEventSubs = this.common_service.getClickEvent().subscribe(() => {
      this.toggleMenu();
    })

    let Token
    let env=sessionStorage.getItem("ENV")
    Token = sessionStorage.getItem("Token")
    let aid = sessionStorage.getItem("Agentid")
    let obj =
    {
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "FlightAgencyBalance",
      "AID": aid,
      "MODULE": "B2B",
      "IP": "182.73.146.154",
      "TOKEN": Token,
      "ENV": env,
      "Version": "1.0.0.0.0.0"
    }

    this.pstService.POST("/FReport", obj).subscribe(res => {
      console.log(res)
      this.count = res[0].Balance;
    })
  }

  dataFromBackend = [{ "id": 1 }, { "id": 3 }]

  ngOnInit() {
    this.get_service.GET("../../../assets/sideMenu.json").subscribe(result => {
      this.Menu = result
      result[4].active = false



    });

    // window.addEventListener("keyup", disableF5);
    // window.addEventListener("keydown", disableF5);
    // function disableF5(e: any) {
    //   if ((e.which || e.keyCode) == 116 || ((e.which || e.keyCode) == 82))
    //     e.preventDefault();
    // };

    (function () {

      var t = 5000;

      function resetTimer() {
        if (t) {
          window.clearTimeout(t);
        }
        t = window.setTimeout(() => {
          alert("Session Timeout Login Again")
          window.location.replace('')
          localStorage.clear();
          sessionStorage.clear();
        }, 1000 * 60 * 30);
      }

      resetTimer();

      ["click", "mousemove", "keypress"].forEach((name) => {
        document.addEventListener(name, resetTimer);
      });

    }());
  }





  // ionViewWillEnter() {
  //   setTimeout(() => {
  //     alert("Session Timeout")
  //     this.logout()
  //   }, 1 * 60 * 60 * 500);
  // }

  logout() {
    this.route.navigate(['/index'])
      .then(() => {
        window.location.reload();
      });
    localStorage.clear();
    sessionStorage.clear();
  }

  toggleMenu() {
    if (this.bigMenu == true) {
      this.bigMenu = !this.bigMenu
    }
    this.bigMenu = !this.bigMenu
  }

  toggleSubMenu(p) {
    this.credTrue = false
    if (p.showDetails) {
      for (let i of this.Menu) {
        if (i.title == p.title) {
          i.showDetails = false;
        }
        else
          i.showDetails = true;
      }
    }
    else {
      p.showDetails = true;
    }
  }

  myAccount() {
    this.bigMenu = false;
    this.credTrue = false
    for (let i of this.Menu) {
      i.showDetails = true
    }
  }

  set_cre = new FormGroup({
    cre1: new FormControl('', [Validators.required]),
  })

  checkCredentials() {
    if (this.set_cre.value.cre1 == "12345") {
      this.credTrue = false
      this.moreOption = false
      this.Menu[4].active = true
    }

  }


  Menu1() {
    this.common_service.sendClickEvent();
  }


}