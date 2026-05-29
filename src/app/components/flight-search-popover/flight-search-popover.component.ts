import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { PopoverController, ToastController, LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { AlertPopoverComponent } from '../../components/alert-popover/alert-popover.component';
import { GetService } from '../../Services/Crud_Services/get.service';
import { PostService } from '../../Services/Crud_Services/post.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-flight-search-popover',
  templateUrl: './flight-search-popover.component.html',
  styleUrls: ['./flight-search-popover.component.scss'],
})
export class FlightSearchPopoverComponent implements OnInit {
  @Input()
  public onClick = () => { }
  unsubscribe$: Subject<boolean> = new Subject();
  todayt = new Date(new Date().getTime()).toISOString().split('T')[0];
  minDate = new Date(new Date().getTime()).toISOString().split('T')[0];
  maxDate: any
  arp: any
  arp_new: any
  adult = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
  childrens = ["0", "1", "2", "3", "4", "5", "6"]
  infants = ["0", "1", "2", "3", "4", "5", "6"]
  F_class = ["First", "Bussiness", "Premium First", "Premium Ecomomy", "Ecomomy (Coach)"]
  F_flights = ["All", "G8", "6E", "SG", "I5", "AI", "9W", "UK", "2T"]
  d_Adult = "1"
  d_Child = "0"
  d_Infants = "0"
  pax_div = false
  mdfy_strt = true
  agentid: string;
  paxDivHide() {
    if (this.mdfy_strt == true) {
      this.pax_div = false
    }
    else {
      this.pax_div = !this.pax_div
    }

  }
  fieldsName = {
    "from": "FROM",
    "to": "TO",
    "dep_date": "DEPARTURE DATE",
    "ret_date": "RETURN DATE",
    "adt": "ADULTS",
    "chd": "CHILDS",
    "inf": "INFANTS",
    "pref_cls": "PREFERED CLASS",
    "pref_flt": "PREFERED FLIGHT",
    "button": "Search Flight",
    "error_msg": "* Required Field can't be blank"
  }
  @Output() newItemEvent = new EventEmitter<any>();
  @Output() callFn = new EventEmitter<any>()
  // *****     TRIP SELECTION CODE START     *****
  @Input() arp_show
  call_parent() {
    this.callFn.emit("true")
  }



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
    this.trip_val = trip.val
    console.log(this.trip_val)
    if (trip.val == 0) {
      this.round_trip = true
      this.multi_trip = true
      this.maxDate = ""
    }
    if (trip.val == 1) {
      this.round_trip = false
      this.multi_trip = true

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
  
  Token: any
  add_flight = true
  pax_arr: FormArray;
  constructor(private route: Router,
    private fb: FormBuilder,
    public popoverController: PopoverController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public datepipe: DatePipe,
    private get_Service: GetService,
    private post_service: PostService,
  ) { }

  sr_str

  ngOnInit() {
    this.Token = sessionStorage.getItem("Token")
    this.agentid = sessionStorage.getItem("Agentid")
    let data = JSON.parse(localStorage.getItem("flt_srh_sector"))
    this.sr_str = data
    console.log(this.sr_str.Sector[0].Src)
    this.get_Service.GET("../../../assets/airport.json").subscribe(result => {

      this.arp = result
      this.arp_new = result
    });
    // this.pax_all_obj = this.fb.group({
    //   pax_arr: this.fb.array([this.createItem(), this.createItem()])
    // });

    this.Token = sessionStorage.getItem("Token")
    // let cnrt_f_data = localStorage.getItem("All_Flight")
    // if (cnrt_f_data !== "") {

    //   let f_all_data = JSON.parse(cnrt_f_data)
    //   let x = f_all_data.Param
    this.depARP = this.sr_str.Sector[0].Src
    this.arrARP = this.sr_str.Sector[0].Des
    //   this.d_Adult = x.Adt
    //   this.d_Child = x.Chd
    //   this.d_Infants = x.Inf
    // }
    this.flightData = this.fb.group({
      D_airport: new FormControl(this.sr_str.Sector[0].Src, [Validators.required]),
      A_airport: new FormControl(this.sr_str.Sector[0].Des, [Validators.required]),
      D_date: new FormControl(this.sr_str.Sector[0].DDate, [Validators.required]),
      A_date: new FormControl(''),
      PClass: new FormControl(this.sr_str.PC),
      PFlight: new FormControl(this.sr_str.PF),
      Adults: new FormControl(this.sr_str.Adt),
      Childs: new FormControl(this.sr_str.Chd),
      Infants: new FormControl(this.sr_str.Inf),
    })
  }

  returnDate(d) {
    let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
    this.minDate = latest_date
  }
  returnDateMax(d) {
    let latest_date = this.datepipe.transform(d, 'yyyy-MM-dd');
    this.maxDate = latest_date
  }
  slideOpts = {
    autoplay: true
  };
  // one_way = true
  trip_val: any = 0
  showw = false
  showwR = false
  depARP = ""
  arrARP = ""

  swap_city() {
    let t = this.depARP
    this.depARP = this.arrARP
    this.arrARP = t
  }

  flightData: FormGroup
  shortArp(ar: string) {
    return ar.substring(0, 3)
  }
  convertDate(dt) {
    return this.datepipe.transform(dt, 'yyyy-MM-dd');
  }

  checkFlight_one() {
    this.mdfy_strt = !this.mdfy_strt
    this.onClick()
    this.pax_div = false
    // let depApt = this.flightData.value.D_airport.substring(0, 3);
    // let arrApt = this.flightData.value.A_airport.substring(0, 3);
    // let latest_date = this.datepipe.transform(this.flightData.value.D_date, 'yyyy-MM-dd');
    // let ret_latest_date = this.datepipe.transform(this.flightData.value.A_date, 'yyyy-MM-dd');
    if (this.shortArp(this.flightData.value.D_airport) != this.shortArp(this.flightData.value.A_airport)) {

      if (this.trip_val == 0) {

        let data = {
          "Trip": "D1",
          "Adt": this.flightData.value.Adults,
          "Chd": this.flightData.value.Childs,
          "Inf": this.flightData.value.Infants,
          "Sector": [
            {
              "Src": this.shortArp(this.flightData.value.D_airport),
              "Des": this.shortArp(this.flightData.value.A_airport),
              "DDate": this.convertDate(this.flightData.value.D_date)
            }
          ],
          "PF": "",
          "PC": "",
          "Routing": "Direct",
          "Ver": "1.0.0.0",
          "Auth": {
            "AgentId": this.agentid,
            "Token": this.Token
          },
          "Env": "P",
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
        this.newItemEvent.emit(data);
        localStorage.setItem("flt_srh_sector", JSON.stringify(data))
      }
    
    }
    else {
      alert("SAME SECTOR CAN'T BE SEARCH")
    }

  }


  get Error() {
    return this.flightData.controls;
  }
  isLoading = false;
  async present(Event, id, src, des) {
    this.isLoading = true;
    const popover = await this.popoverController.create({
      component: AlertPopoverComponent,
      cssClass: 'alert-popover_setting',
      translucent: true,
      // mode: 'ios',
      backdropDismiss: false,
      componentProps: {
        "paramID": id,
        "s": src,
        "P": des
      },
    })
    return popover.present();

  }


  async DismissClick() {
    await this.popoverController.dismiss();
  }



  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  togglePax() {
  if (!this.mdfy_strt) {
    this.pax_div = !this.pax_div;
  }
}



filteredAirports: any[] = [];
showFrom = false;

filterAirports(event: any, type: string) {
  const value = event.target.value.toLowerCase();

  const filtered = this.arp.filter((a: any) =>
    a.city.toLowerCase().includes(value) ||
    a.code.toLowerCase().includes(value)
  );

  if (type === 'from') {
    this.filteredAirports = filtered;
  } else if (type === 'to') {
    this.filteredToAirports = filtered;
  }
}
selectAirport(arpt: any, type: string) {

  if (type === 'from') {
    this.flightData.patchValue({
      D_airport: arpt.code
    });

    this.depARP = `${arpt.code} - ${arpt.city}`;
    this.showFrom = false;

  } else if (type === 'to') {
    this.flightData.patchValue({
      A_airport: arpt.code
    });

    this.arrARP = `${arpt.code} - ${arpt.city}`;
    this.showTo = false;
  }
}

showTo = false;
filteredToAirports: any[] = [];



}
