// import { Component, OnInit, HostListener, Inject, ChangeDetectorRef } from '@angular/core';
// import { DOCUMENT } from '@angular/common';
// import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
// import { Router } from '@angular/router';
// import { PopoverController, ToastController, LoadingController } from '@ionic/angular';
// import { DatePipe } from '@angular/common';
// import { AlertPopoverComponent } from '../../../components/alert-popover/alert-popover.component';
// import { GetService } from '../../../Services/Crud_Services/get.service';
// import { PostService } from '../../../Services/Crud_Services/post.service';
// import { CommonService } from '../../../Services/Other_Services/common.service';
// // import { ComponentShareModule } from '../../../form-share/component-share.module';
// import { Subject } from 'rxjs';
// @Component({
//   selector: 'app-f-search',
//   templateUrl: './f-search.page.html',
//   styleUrls: ['./f-search.page.scss'],
// })
// export class FSearchPage implements OnInit {

//   // slideOpts = {
//   //   autoplay: true,
//   //   initialSlide: 0,
//   //   speed: 1000,
//   //   effect: 'flip',
//   // };
//   unsubscribe$: Subject<boolean> = new Subject();
//   todayt = new Date(new Date().getTime()).toISOString().split('T')[0];
//   minDate:any = new Date(new Date().getTime()).toISOString().split('T')[0];
//   maxDate: any
//   arp: any
//   moreFields:any
//   arp_new: any
//   adult = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
//   childrens = ["0", "1", "2", "3", "4", "5", "6"]
//   infants = ["0", "1", "2", "3", "4", "5", "6"]
//   F_class = ["First", "Bussiness", "Premium First", "Premium Ecomomy", "Ecomomy (Coach)"]
//   F_flights = ["All", "G8", "6E", "SG", "I5", "AI", "9W", "UK", "2T"]
//   d_DepCity:any
//   d_ArrCity:any
//   d_Adult = "1";
//   d_Child = "0";
//   d_Infants = "0";
//   fieldsName = {
//     "from": "FROM",
//     "to": "TO",
//     "dep_date": "DEPARTURE ",
//     "ret_date": "RETURN ",
//     "adt": "ADULTS",
//     "chd": "CHILDREN ",
//     "inf": "INFANTS ",
//     "pref_cls": "CHOOSE TRAVEL CLASS",
//     "pref_flt": "CHOOSE PREFERED FLIGHT",
//     "button": "Search",
//     "error_msg": "* Required Field can't be blank"
//   }


//   arp_show = true
//   env: string;
//   arp_s_h() {
//     this.arp_show = true
//   }
//   @HostListener('document:click', ['$event']) onDocumentClick(event:any) {
//     // this.arp_show = true;
//     this.arr_show = false;
//   }

//   onScroll(event:any) {
//     if (event.detail.deltaY > 0) {
//       this.arp_show = false;
//       // this.arr_show = false;
//     }
//   }
  

//   // AIRPORT SEARCH FILTER START (SAME AS DATALIST TAG)

//   arr_show_dep = false
//   arr_show_dep_fun() {
//     this.arr_show_dep = true
//   }
//   getDepValFun(data:any){
//     this.arr_show_dep = false
//     this.depARP = `${data.code}, ${data.city}, ${data.country}`
//   }
//   arr_show = false
//   arr_s_h() {
//     this.arr_show = true
//   }
//   getarrVal(data:any) {
//     this.arr_show = false
//     this.arrARP = `${data.code}, ${data.city}, ${data.country}`
//   }
// // AIRPORT SEARCH FILTER END

//   // *****     TRIP SELECTION CODE START     *****


//   trip_selection_arr = [
//     { "Name": "One Way", "val": 0, "isAfterActive": true },
//     { "Name": "Round Trip", "val": 1, "isAfterActive": false },
//     // { "Name": "Multi Trip", "val": 2, "isAfterActive": false },
//     // { "Name": "Round Special", "val": 3, "isAfterActive": false },
//     // { "Name": "Advance Trip", "val": 4, "isAfterActive": false },
//   ]
//   round_trip = true  //return date active or deactive  true=deactive, false =active
//   multi_trip = true  // multi trip active or deactive  true=deactive, false =active
//   labelPosition='';
//   value='';
//   search=false;
//   searchby(){
//     console.log(this.labelPosition);
//     console.log(this.value)
//     this.search=true
//     localStorage.setItem('labelPosition',this.labelPosition)
//     localStorage.setItem('value',this.value)
//     localStorage.setItem('searchby',"TRUE")
//     this.route.navigate(['/home/searchby'])
//   }
//   trip_selection_function(trip: any) {
//     this.trip_selection_arr.map((d) => d.isAfterActive = false)
//     let objIndex = this.trip_selection_arr.findIndex((obj => obj.val == trip.val));
//     this.trip_selection_arr[objIndex].isAfterActive = true
//     this.trip_val = trip.val
//     if (trip.val == 0) {
//       this.round_trip = true
//       this.multi_trip = true
//       this.maxDate = ""
//     }
//     if (trip.val == 1) {
//       this.round_trip = false
//       this.multi_trip = true

//     }
//     if (trip.val == 2) {
//       this.round_trip = true
//       this.multi_trip = false
//     }
//     if (trip.val == 3) {
//       this.round_trip = true
//       this.multi_trip = true
//     }
//     if (trip.val == 4) {
//       this.round_trip = false
//       this.multi_trip = true
//     }

//   }
//   //*****     TRIP SELECTION CODE END     *****


//   agentid:any
//   Token: any
//   add_flight = true
//   pax_arr:any= FormArray;
//   constructor(private route: Router,
//     private fb: FormBuilder,
//     public popoverController: PopoverController,
//     public toastController: ToastController,
//     public loadingController: LoadingController,
//     public datepipe: DatePipe,
//     private get_Service: GetService,
//     @Inject(DOCUMENT) private document: Document) { }
//   arr = []
//   ngOnInit() {
//     localStorage.clear()
//     this.env=sessionStorage.getItem("ENV")
//     this.get_Service.GET("../../../assets/airport.json").subscribe(result => {
//       this.arp = result
//       this.arp_new = result

//     });
//     this.pax_all_obj = this.fb.group({
//       pax_arr: this.fb.array([this.createItem(), this.createItem()])
//     });

//     this.Token = sessionStorage.getItem("Token")
//     this.agentid=sessionStorage.getItem("Agentid")
//     // this.onWindowScroll

//   }




//   returnDate(d:any) {
//     let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');

//     this.minDate = latest_date
//   }
//   returnDateMax(d:any) {
//     let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
//     this.maxDate = latest_date
//   }

//   slideOpts = {
//     autoplay: true
//   };

//   // one_way = true

//   trip_val: any = 0


//   // showw = false
//   // showwR = false
//   // searcharp
//   // s: any;
//   // showArpList() {
//   //   this.showw = true
//   // }
//   // airValue(arpt) {
//   //   this.d_DepCity = arpt.code + " , " + arpt.city + " , " + arpt.country
//   //   this.showw = false
//   //   this.removeAirport(arpt.code)
//   // }
//   // removeAirport(arrApt) {

//   //   if (arrApt !== "") {
//   //     let depApt1 = arrApt.substring(0, 3);
//   //     this.d_DepCity = depApt1
//   //     console.log(depApt1)
//   //     this.arp_new = this.arp.filter(Array => Array.code !== depApt1);
//   //   }

//   // }
//   // search(val: any) {
//   //   this.s = val.target.value;

//   // }

//   //Return Airport
//   // r
//   // searchRet(val: any) {
//   //   this.r = val.target.value;arrARP
//   // }
//   // showArpListRet() {
//   //   this.showwR = true
//   // }

//   // airValueRet(arpt) {
//   //   this.d_ArrCity = arpt.code + " , " + arpt.city + " , " + arpt.country
//   //   this.showwR = false
//   //   this.removeAirportDep(arpt.code)
//   // }

//   // removeAirportDep(depApt) {
//   //   let depApt1 = depApt.substring(0, 3);
//   //   this.d_ArrCity = depApt1
//   //   console.log(depApt1)
//   //   // let arrApt = this.flightData.value.A_airport.substring(0, 3);
//   //   this.arp = this.arp_new.filter(Array => Array.code !== depApt1);
//   // }




//   depARP = ""
//   arrARP = ""

//   swap_city() {
//     [this.depARP,this.arrARP]=[this.arrARP,this.depARP]
//     // let t = this.depARP
//     // this.depARP = this.arrARP
//     // this.arrARP = t
//   }
  
//   flightData:any = this.fb.group({
//     D_airport: new FormControl('', [Validators.required]),
//     A_airport: new FormControl('', [Validators.required]),
//     D_date: new FormControl(this.todayt, [Validators.required]),
//     A_date: new FormControl(''),
//     PClass: new FormControl(''),
//     PFlight: new FormControl(''),
//     Adults: new FormControl(''),
//     Childs: new FormControl(''),
//     Infants: new FormControl('')
//   })

//   checkFlight_one() {
//     let depApt:any = this.flightData.value.D_airport.substring(0, 3);
//     let arrApt = this.flightData.value.A_airport.substring(0, 3);
//     let latest_date = this.datepipe.transform(this.flightData.value.D_date, 'yyyy-MM-dd');
//     let ret_latest_date = this.datepipe.transform(this.flightData.value.A_date, 'yyyy-MM-dd');
//     if (depApt != arrApt) {

//       if (this.trip_val == 0) {
//         let data = {
//           "Trip": "D1",
//           "Adt": this.d_Adult,
//           "Chd": this.d_Child,
//           "Inf": this.d_Infants,
//           "Sector": [
//             {
//               "Src": arrApt,
//               "Des": depApt,
//               "DDate": latest_date
//             }
//           ],
//           "PF": this.flightData.value.PFlight || "",
//           "PC": this.flightData.value.PClass || "",
//           "Routing": "Direct",
//           "Ver": "1.0.0.0",
//           "Auth": {
//             "AgentId": this.agentid,
//             "Token":  this.Token 
//           },
//           "Env": this.env,
//           "Module": "B2B",
//           "OtherInfo": {
//               "PromoCode": "",
//                "FFlight": "QP",
//                "FareType": "",
//                "TraceId": "",
//                "IsUnitTesting": false,
//                "TPnr": false
//               }

//         }

//         console.log(data)
        
//         localStorage.setItem("flt_srh_sector", JSON.stringify(data))
//         this.route.navigate(['home/foneway'], { queryParams: { trip: 'oneway' } })

//       }
//       if (this.trip_val == 1) {

//         let data = {
//           "Trip": "D2",
//           "Adt": this.d_Adult,
//           "Chd": this.d_Child,
//           "Inf": this.d_Infants,
//           "Sector": [
//             {
//               "Src": depApt,
//               "Des": arrApt,
//               "DDate": latest_date
//             },
//             {
//               "Src": arrApt,
//               "Des": depApt,
//               "DDate": ret_latest_date
//             }
//           ],
//           "PF": this.flightData.value.PFlight || "",
//           "PC": "",
//           "Routing": "Direct",
//           "Ver": "1.0.0.0",
//           "Auth": {
//             "AgentId":this.agentid,
//             "Token": this.Token
//           },
//           "Env": this.env,
//           "Module": "B2B",
//           "OtherInfo": {
//             "PromoCode": "",
//              "FFlight": "",
//              "FareType": "",
//              "TraceId": "",
//              "IsUnitTesting": false,
//              "TPnr": false
//             }
//         }
//         localStorage.setItem("flt_srh_sector", JSON.stringify(data))
//         this.route.navigate(['home/froundtrip'], { queryParams: { trip: 'roundtrip' } })

//       }
//     }
//     else {
//       alert("SAME SECTOR CAN'T BE SEARCH")
//     }

//   }




//   // MULTI TRIP
//   ind: any = 2
//   add_pass_show = true
//   pax_all_obj = this.fb.group({
//     pax_arr: this.fb.array([this.createItem()]),
//   })

//   createItem() {
//     return this.fb.group({
//       D_airport: new FormControl('', [Validators.required]),
//       A_airport: new FormControl('', [Validators.required]),
//       D_date: new FormControl(this.todayt, [Validators.required]),
//     });
//   }
//   addItem(): void {
//     this.pax_arr = this.pax_all_obj.get('pax_arr') as FormArray;
//     if (this.pax_arr.length < 5) {
//       this.pax_arr.push(this.createItem());
//     }
//     if (this.pax_arr.length > 4) {
//       this.add_pass_show = false
//     }

//     this.ind = this.pax_arr.length

//   }

//   getControlspaxarr() {
//     return (this.pax_all_obj.get('pax_arr') as FormArray).controls;
//   }

//   removeRow(index:any) {
//     (<FormArray>this.pax_all_obj.get("pax_arr")).removeAt(index);
//     this.add_pass_show = true
//     this.ind = this.pax_arr.length
//   }


//   onSubmit() {
//     let data = {
//       "Trip": "D1",
//       "Adt": this.d_Adult,
//       "Chd": this.d_Child,
//       "Inf": this.d_Infants,
//       "Sector": this.pax_all_obj.value.pax_arr,
//       "PF": this.flightData.value.PFlight || "G8",
//       "PC": this.flightData.value.PClass || "",
//       "Routing": "Direct",
//       "Ver": "1.0.0.0",
//       "Auth": {
//         "AgentId": "18785869",
//         "Token": "XXXXXXX"
//       },
//       "Env": this.env,
//       "Module": "B2B",
//       "OtherInfo": {
//         "PromoCode": "KAF2022",
//         "TraceId": "2ea11cac-f0fb-49a0-acdb-dfbf008364a1",
//         "IsUnitTesting": false
//       }

//     }
//     console.log(data)

//   }

//   get Error() {
//     return this.flightData.controls;
//   }
//   // isLoading = false;
//   // async present(Event, id, src, des) {
//   //   this.isLoading = true;
//   //   const popover = await this.popoverController.create({
//   //     component: AlertPopoverComponent,
//   //     cssClass: 'alert-popover_setting',
//   //     translucent: true,
//   //     // mode: 'ios',
//   //     backdropDismiss: false,
//   //     componentProps: {
//   //       "paramID": id,
//   //       "s": src,
//   //       "d": des
//   //     },
//   //   })
//   //   return popover.present();

//   // }


//   // async DismissClick() {
//   //   await this.popoverController.dismiss();
//   // }



//   ngOnDestroy() {
//     this.unsubscribe$.next(true);
//     this.unsubscribe$.complete();
//   }


// }



import { Component, OnInit, HostListener, Inject, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { PopoverController, ToastController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { AlertPopoverComponent } from '../../../components/alert-popover/alert-popover.component';
import { GetService } from '../../../Services/Crud_Services/get.service';
import { PostService } from '../../../Services/Crud_Services/post.service';
import { CommonService } from '../../../Services/Other_Services/common.service';
// import { ComponentShareModule } from '../../../form-share/component-share.module';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-f-search',
  templateUrl: './f-search.page.html',
  styleUrls: ['./f-search.page.scss'],
})
export class FSearchPage implements OnInit {

  // slideOpts = {
  //   autoplay: true,
  //   initialSlide: 0,
  //   speed: 1000,
  //   effect: 'flip',
  // }; 

  

  unsubscribe$: Subject<boolean> = new Subject();
  todayt = new Date(new Date().getTime()).toISOString().split('T')[0];
  minDate: any = new Date(new Date().getTime()).toISOString().split('T')[0];
  maxDate: any
  arp: any
  moreFields: any
  arp_new: any
  adult = ["SELECT","1", "2", "3", "4", "5", "6", "7", "8", "9"]
  childrens = ["SELECT","0", "1", "2", "3", "4", "5", "6"]
  infants = ["SELECT","0", "1", "2", "3", "4", "5", "6"]
  F_class = ["First", "Bussiness", "Premium First", "Premium Ecomomy", "Ecomomy (Coach)"]
  F_flights = ["All", "G8", "6E", "SG", "I5", "AI", "9W", "UK", "2T"]
  d_DepCity: any
  d_ArrCity: any
  d_Adult = "1";
  d_Child = "0";
  d_Infants = "0";
  pax_div = false
  totalpax=1;
  paxDivHide() {
    this.totalpax= parseInt(this.flightData.value.Adults)
    this.pax_div = !this.pax_div


  }
  fieldsName = {
    "from": "FROM",
    "to": "TO",
    "dep_date": "DEPARTURE ",
    "ret_date": "RETURN ",
    "adt": "ADULTS",
    "chd": "CHILDREN ",
    "inf": "INFANTS ",
    "pref_cls": "CHOOSE TRAVEL CLASS",
    "pref_flt": "CHOOSE PREFERED FLIGHT",
    "button": "Search",
    "error_msg": "* Required Field can't be blank"
  }


  arp_show = true
  env: string;
  arp_s_h() {
    this.arp_show = true
  }
  @HostListener('document:click', ['$event']) onDocumentClick(event: any) {
    // this.arp_show = true;
    this.arr_show = false;
  }

  onScroll(event: any) {
    if (event.detail.deltaY > 0) {
      this.arp_show = false;
      // this.arr_show = false;
    }
  }


  // AIRPORT SEARCH FILTER START (SAME AS DATALIST TAG)

  arr_show_dep = false
  arr_show_dep_fun() {
    this.arr_show_dep = true
    this.to = this.depARP
  }
  getDepValFun(data: any) {
    this.arr_show_dep = false
    this.depARP = `${data.code}, ${data.city}, ${data.country}`
    this.to = data.city
    this.to = this.to.toLocaleUpperCase()
  }
  arr_show = false
  arr_s_h() {
    this.arr_show = true
    this.from = this.arrARP
  }
  getarrVal(data: any) {
    this.arr_show = false
    this.arrARP = `${data.code}, ${data.city}, ${data.country}`
    this.from = data.city
    this.from = this.from.toLocaleUpperCase()
  }
  // AIRPORT SEARCH FILTER END

  // *****     TRIP SELECTION CODE START     *****


  trip_selection_arr = [
    { "Name": "One Way", "val": 0, "isAfterActive": true },
    { "Name": "Round Trip", "val": 1, "isAfterActive": false },
    // { "Name": "Multi Trip", "val": 2, "isAfterActive": false },
    // { "Name": "Round Special", "val": 3, "isAfterActive": false },
    // { "Name": "Advance Trip", "val": 4, "isAfterActive": false },
  ]
  round_trip = true  //return date active or deactive  true=deactive, false =active
  multi_trip = true  // multi trip active or deactive  true=deactive, false =active
  trip_selection_function(trip: any) {
    this.trip_selection_arr.map((d) => d.isAfterActive = false)
    let objIndex = this.trip_selection_arr.findIndex((obj => obj.val == trip.val));
    this.trip_selection_arr[objIndex].isAfterActive = true
    this.trip_val = trip.val
    if (trip.val == 0) {
      this.round_trip = true
      this.flightData.get('A_date')?.disable();
      this.multi_trip = true
      this.maxDate = ""
      this.changedate2 = ""
    }
    if (trip.val == 1) {
      this.round_trip = false
      this.multi_trip = true
      this.flightData.get('A_date')?.enable();
      this.changedate2 = this.todayt
    }
    if (trip.val == 2) {
      this.round_trip = true
      this.multi_trip = false
    }
    if (trip.val == 3) {
      this.round_trip = true
      this.multi_trip = true
    }
    if (trip.val == 4) {
      this.round_trip = false
      this.multi_trip = true
    }

  }
  //*****     TRIP SELECTION CODE END     *****

  changedate2
  agentid: any
  Token: any
  add_flight = true
  pax_arr: any = FormArray;
  constructor(private route: Router,
    private fb: FormBuilder,
    public popoverController: PopoverController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public datepipe: DatePipe,
    private get_Service: GetService,
    @Inject(DOCUMENT) private document: Document) { }
  arr = []
  ngOnInit() {
    localStorage.clear()
    this.env = sessionStorage.getItem("ENV")
    this.get_Service.GET("../../../assets/airport.json").subscribe(result => {
      this.arp = result
      this.arp_new = result

    });
    this.pax_all_obj = this.fb.group({
      pax_arr: this.fb.array([this.createItem(), this.createItem()])
    });

    this.Token = sessionStorage.getItem("Token")
    this.agentid = sessionStorage.getItem("Agentid")
    // this.onWindowScroll

  }




  returnDate(d: any) {
    let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');

    this.minDate = latest_date
  }
  returnDateMax(d: any) {
    let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
    this.maxDate = latest_date
  }

  slideOpts = {
    autoplay: true
  };

  // one_way = true

  trip_val: any = 0


  // showw = false
  // showwR = false
  // searcharp
  // s: any;
  // showArpList() {
  //   this.showw = true
  // }
  // airValue(arpt) {
  //   this.d_DepCity = arpt.code + " , " + arpt.city + " , " + arpt.country
  //   this.showw = false
  //   this.removeAirport(arpt.code)
  // }
  // removeAirport(arrApt) {

  //   if (arrApt !== "") {
  //     let depApt1 = arrApt.substring(0, 3);
  //     this.d_DepCity = depApt1
  //     console.log(depApt1)
  //     this.arp_new = this.arp.filter(Array => Array.code !== depApt1);
  //   }

  // }
  // search(val: any) {
  //   this.s = val.target.value;

  // }

  //Return Airport
  // r
  // searchRet(val: any) {
  //   this.r = val.target.value;arrARP
  // }
  // showArpListRet() {
  //   this.showwR = true
  // }

  // airValueRet(arpt) {
  //   this.d_ArrCity = arpt.code + " , " + arpt.city + " , " + arpt.country
  //   this.showwR = false
  //   this.removeAirportDep(arpt.code)
  // }

  // removeAirportDep(depApt) {
  //   let depApt1 = depApt.substring(0, 3);
  //   this.d_ArrCity = depApt1
  //   console.log(depApt1)
  //   // let arrApt = this.flightData.value.A_airport.substring(0, 3);
  //   this.arp = this.arp_new.filter(Array => Array.code !== depApt1);
  // }


  from = "DEL"
  to = "BOM"

  depARP = ""
  arrARP = ""

  swap_city() {
    // [this.depARP,this.arrARP]=[this.arrARP,this.depARP]
    [this.from, this.to] = [this.to, this.from]

    let t = this.depARP
    this.depARP = this.arrARP
    this.arrARP = t
  }

  flightData: any = this.fb.group({
    D_airport: new FormControl('', [Validators.required]),
    A_airport: new FormControl('', [Validators.required]),
    D_date: new FormControl(this.todayt, [Validators.required]),
    A_date: new FormControl({ value: '', disabled: true }),
    PClass: new FormControl(''),
    PFlight: new FormControl(''),
    Adults: new FormControl(''),
    Childs: new FormControl(''),
    Infants: new FormControl('')
  })

  checkFlight_one() {
    let depApt: any = this.flightData.value.D_airport.substring(0, 3);
    let arrApt = this.flightData.value.A_airport.substring(0, 3);
    let latest_date = this.datepipe.transform(this.flightData.value.D_date, 'yyyy-MM-dd');
    let ret_latest_date = this.datepipe.transform(this.flightData.value.A_date, 'yyyy-MM-dd');
    if (depApt != arrApt || depApt == "" && arrApt == "") {

      if (this.trip_val == 0) {
        let data = {
          "Trip": "D1",
          "Adt": this.flightData.value.Adults||1,
          "Chd": this.flightData.value.Childs||0,
          "Inf": this.flightData.value.Infants||0,
          "Sector": [
            {
              "Src": arrApt || "DEL",
              "Des": depApt || "BOM",
              "DDate": latest_date
            }
          ],
          "PF": this.flightData.value.PFlight || "",
          "PC": this.flightData.value.PClass || "",
          "Routing": "Direct",
          "Ver": "1.0.0.0",
          "Auth": {
            "AgentId": this.agentid,
            "Token": this.Token
          },
          "Env": this.env,
          "Module": "B2B",
          "OtherInfo": {
            "PromoCode": "",
            "FFlight": "",
            "FareType": "",
            "TraceId": "",
            "IsUnitTesting": false,
            "TPnr": false
          }

        }

        console.log(data)

        localStorage.setItem("flt_srh_sector", JSON.stringify(data))
        this.route.navigate(['home/foneway'], { queryParams: { trip: 'oneway' } })

      }
      if (this.trip_val == 1) {

        let data = {
          "Trip": "D2",
          "Adt": this.flightData.value.Adults||1,
          "Chd": this.flightData.value.Childs||0,
          "Inf": this.flightData.value.Infants||0,
          "Sector": [
            {
              "Src": depApt || "DEL",
              "Des": arrApt || "BOM",
              "DDate": latest_date
            },
            {
              "Src": arrApt || "BOM",
              "Des": depApt || "DEL",
              "DDate": ret_latest_date
            }
          ],
          "PF": this.flightData.value.PFlight || "",
          "PC": "",
          "Routing": "Direct",
          "Ver": "1.0.0.0",
          "Auth": {
            "AgentId": this.agentid,
            "Token": this.Token
          },
          "Env": this.env,
          "Module": "B2B",
          "OtherInfo": {
            "PromoCode": "",
            "FFlight": "",
            "FareType": "",
            "TraceId": "",
            "IsUnitTesting": false,
            "TPnr": false
          }
        }
        localStorage.setItem("flt_srh_sector", JSON.stringify(data))
        this.route.navigate(['home/froundtrip'], { queryParams: { trip: 'roundtrip' } })

      }
    }
    else {
      alert("SAME SECTOR CAN'T BE SEARCH")
    }

  }




  // MULTI TRIP
  ind: any = 2
  add_pass_show = true
  pax_all_obj = this.fb.group({
    pax_arr: this.fb.array([this.createItem()]),
  })

  createItem() {
    return this.fb.group({
      D_airport: new FormControl('', [Validators.required]),
      A_airport: new FormControl('', [Validators.required]),
      D_date: new FormControl(this.todayt, [Validators.required]),
    });
  }
  addItem(): void {
    this.pax_arr = this.pax_all_obj.get('pax_arr') as FormArray;
    if (this.pax_arr.length < 5) {
      this.pax_arr.push(this.createItem());
    }
    if (this.pax_arr.length > 4) {
      this.add_pass_show = false
    }

    this.ind = this.pax_arr.length

  }
  changedate1 = this.todayt

  getControlspaxarr() {
    return (this.pax_all_obj.get('pax_arr') as FormArray).controls;
  }

  removeRow(index: any) {
    (<FormArray>this.pax_all_obj.get("pax_arr")).removeAt(index);
    this.add_pass_show = true
    this.ind = this.pax_arr.length
  }


  onSubmit() {
    let data = {
      "Trip": "D1",
      "Adt": this.flightData.value.Adults||1,
      "Chd": this.flightData.value.Childs||0,
      "Inf": this.flightData.value.Infants||0,
      "Sector": this.pax_all_obj.value.pax_arr,
      "PF": this.flightData.value.PFlight || "G8",
      "PC": this.flightData.value.PClass || "",
      "Routing": "Direct",
      "Ver": "1.0.0.0",
      "Auth": {
        "AgentId": "18785869",
        "Token": "XXXXXXX"
      },
      "Env": this.env,
      "Module": "B2B",
      "OtherInfo": {
        "PromoCode": "KAF2022",
        "TraceId": "2ea11cac-f0fb-49a0-acdb-dfbf008364a1",
        "IsUnitTesting": false
      }

    }
    console.log(data)

  }

  get Error() {
    return this.flightData.controls;
  }
  // isLoading = false;
  // async present(Event, id, src, des) {
  //   this.isLoading = true;
  //   const popover = await this.popoverController.create({
  //     component: AlertPopoverComponent,
  //     cssClass: 'alert-popover_setting',
  //     translucent: true,
  //     // mode: 'ios',
  //     backdropDismiss: false,
  //     componentProps: {
  //       "paramID": id,
  //       "s": src,
  //       "d": des
  //     },
  //   })
  //   return popover.present();

  // }


  // async DismissClick() {
  //   await this.popoverController.dismiss();
  // }



  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }


}

