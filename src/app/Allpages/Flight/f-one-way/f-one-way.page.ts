import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PopoverController, LoadingController } from '@ionic/angular';
import { PostService } from '../../../Services/Crud_Services/post.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-f-one-way',
  templateUrl: './f-one-way.page.html',
  styleUrls: ['./f-one-way.page.scss'],
})
export class FOneWayPage implements OnInit {
  m_show = false
  isSkelton = true
  Skelton = false
  skArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 5, 6, 1, 2, 3, 1, 2, 3, 1, 2, 3, 12, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
  unsubscribe$: Subject<boolean> = new Subject();
  panelOpenState = false;
  all_dates = [];
  srh_flt = false
  minDate: string = "";
  dnf = false
  f_all_data: any
  arr_data: any
  arr_data1: any
  t_type = "0"
  data = false
  maxDate: any
  arp_show = true
  indexHidden: any
  hide: any
  env: string;
  stops_=false;
  airline=false
  dep_time=false
  arr_time=false
  price =false;
  arr(){
    this.arr_time=!this.arr_time
  }
  dep(){
    this.dep_time=!this.dep_time
  }
checkstop(){
  this.stops_=!this.stops_;
}
  checkprice(){
    this.price=!this.price ;
  }

checkair(){
  this.airline=!this.airline;
}
  arp_s_h() {
    this.arp_show = true
  }
  test(e: any) {
    this.arp_show = true
  }

  onScroll(event: any) {
    if (event.detail.deltaY > 0) {
      this.arp_show = false;
    }
  }
  public STOPS = [
    { val: '0', Name: 'Non Stop', isChecked: false, count: 0 },
    { val: '1', Name: 'One Stop', isChecked: false, count: 0 },
    { val: '2', Name: 'Two Stop', isChecked: false, count: 0 },
    { val: '3', Name: 'Three Stop', isChecked: false, count: 0 }
  ];
  public DEP_TIME = [
    { val1: '0', val2: '6', isChecked: false, count: 0, img: "morning_inactive.png", title: "Before 6 AM" },
    { val1: '6', val2: '12', isChecked: false, count: 0, img: "noon_inactive.png", title: "6 AM - 12 PM" },
    { val1: '12', val2: '18', isChecked: false, count: 0, img: "evening_inactive.png", title: "12 PM - 6 PM" },
    { val1: '18', val2: '24', isChecked: false, count: 0, img: "night_inactive.png", title: "After 6 PM" }
  ];
  public ARR_TIME = [
    { val1: '00', val2: '06', isChecked: false, count: 0, img: "morning_inactive.png", title: "Before 6 AM" },
    { val1: '06', val2: '12', isChecked: false, count: 0, img: "noon_inactive.png", title: "6 AM - 12 PM" },
    { val1: '12', val2: '18', isChecked: false, count: 0, img: "evening_inactive.png", title: " 12 PM - 6 PM" },
    { val1: '18', val2: '24', isChecked: false, count: 0, img: "night_inactive.png", title: "After 6 PM" }
  ];
  public Come_FLIGHTS: any = [];

  background: ThemePalette = 'primary'
  sr_str: any
  arp: any
  arp_new: any
  // update() {
  //   this.cms_service.nextCount()
  // }
  i: any

  constructor(
    private route: Router,
    public popoverController: PopoverController,
    public loadingController: LoadingController,
    private post_service: PostService,
    public datepipe: DatePipe
  ) {

  }
  addItem(newItem: string) {
    this.sr_str = newItem
    this.apicall(newItem)
    this.m_show = false
  }
  Token
  agentid
  today = new Date(new Date().getTime()).toISOString().split('T')[0];

  ngOnInit() {
    this.env=sessionStorage.getItem("ENV")
    let data: any = JSON.parse(localStorage.getItem("flt_srh_sector") || '{}')
    this.Token = sessionStorage.getItem("Token")
    this.agentid = sessionStorage.getItem("Agentid")
    this.sr_str = data


    let dateFormatTotime = new Date(this.sr_str.Sector[0].DDate);
    let increasedDate = new Date(dateFormatTotime.getTime() + (1 * 86400000));
    let decreasedDate = new Date(dateFormatTotime.getTime() - (1 * 86400000));
    this.nextdate=this.datepipe.transform(increasedDate, 'yyyy-MM-dd');
    this.prevdate=this.datepipe.transform(decreasedDate, 'yyyy-MM-dd');
   
    this.apicall(data)

  }
  apicall(data: any) {
    this.Come_FLIGHTS = []
    for (let i = 0; i < this.STOPS.length; i++) {
      this.STOPS[i].count = 0
    }

    for (let i = 0; i < this.DEP_TIME.length; i++) {
      this.DEP_TIME[i].count = 0;
      this.ARR_TIME[i].count = 0
    }
    this.isSkelton = true
    this.dnf = false
    this.post_service.POST("/FSearch", data).subscribe((Flight) => {
      console.log(Flight)
      localStorage.setItem("flt_srh_sector", JSON.stringify(Flight.Param))
      this.isSkelton = false
      this.Skelton = true
      this.f_all_data = Flight
      // this.arr_data = this.f_all_data.Schedules[0].filter((d: { Fare: { GrandTotal: number; }; }) => d.Fare.GrandTotal)
       let data=this.f_all_data.Schedules[0].sort((p1, p2) => (p1.Fare.GrandTotal > p2.Fare.GrandTotal) ? 1 : (p1.Fare.GrandTotal < p2.Fare.GrandTotal) ? -1 : 0)
       this.arr_data = data
      // this.arr_data = this.f_all_data.Schedules[0].filter((d: { Fare: { GrandTotal: number; }; }) => d.Fare.GrandTotal >= this.f_all_data.MinimumFare)
      let uniqueChars: any[] = [];


      this.arr_data.forEach((c: any) => {
        if (!uniqueChars.includes(c.FName)) {
          uniqueChars.push(c.FName);
        }
      })
      console.log(uniqueChars[1])
      let ak = uniqueChars.filter((c, index) => {
        return uniqueChars.indexOf(c) === index;
      });


      // let ak=[...new Set(uniqueChars)];
      // let uniqueObjArray = [...new Map(this.arr_data.map((item) => [item["id"], item])).values()];

      ak.forEach((d) => {
        this.Come_FLIGHTS.push({ val: d, isChecked: false, count: 0 })

      })


      // console.log(this.Come_FLIGHTS)



      for (let i = 0; i < this.STOPS.length; i++) {
        for (let j = 0; j < this.arr_data.length; j++) {
          if (this.STOPS[i].val == this.arr_data[j].Stop) {
            this.STOPS[i].count++;
          }
        }

      }

      for (let i = 0; i < this.Come_FLIGHTS.length; i++) {
        for (let j = 0; j < this.arr_data.length; j++) {

          if (this.Come_FLIGHTS[i].val.FName == this.arr_data[j].FName) {
            this.Come_FLIGHTS[i].count++;
          }
        }

      }

      for (let i = 0; i < this.DEP_TIME.length; i++) {
        for (let j = 0; j < this.arr_data.length; j++) {
          if (parseInt(this.DEP_TIME[i].val1) < parseInt(this.arr_data[j].Itinerary[0].DDate.split('T')[1].split(':')[0]) && parseInt(this.DEP_TIME[i].val2) > parseInt(this.arr_data[j].Itinerary[0].DDate.split('T')[1].split(':')[0])) {
            this.DEP_TIME[i].count++;
          }
        }

      }

      for (let i = 0; i < this.ARR_TIME.length; i++) {
        for (let j = 0; j < this.arr_data.length; j++) {
          if (parseInt(this.ARR_TIME[i].val1) < parseInt(this.arr_data[j].Itinerary[0].ADate.split('T')[1].split(':')[0]) && parseInt(this.ARR_TIME[i].val2) > parseInt(this.arr_data[j].Itinerary[0].ADate.split('T')[1].split(':')[0])) {
            this.ARR_TIME[i].count++;
          }
        }

      }


    }, error => {
      console.log(error)
      this.dnf = true
      this.isSkelton = false
      this.Skelton = false


    })

  }

  stops: any
  a: any
  check(g: any) {
    this.a = g
    if (this.stops == true) {
      this.stops = !this.stops
    }
    this.stops = !this.stops
  }





  // *********************      FILTERS START     ************************



  stpId: any
  reset_stop_key: Boolean = false
  getStop(value: any) {
    console.log(this.airlineId)
    this.reset_stop_key = true
    this.stpId = value.val
    if(!this.reset_airline_key){
    this.arr_data = this.f_all_data.Schedules[0].filter((d: { Stop: any; }) => d.Stop == value.val)
  
  }
  else{
    this.arr_data = this.f_all_data.Schedules[0].filter((d:any) => d.Stop == value.val&&d.FName==this.airlineId)
  }
  }
  reset_stop_filter() {
    this.reset_stop_key = false
    this.stpId = " "
    this.arr_data = this.f_all_data.Schedules[0]
  }


  airlineId: any
  reset_airline_key = false
  flt_name_filter(event: any) {
    this.airlineId = event.val
    this.reset_airline_key = true
    if(!this.reset_stop_key){
    this.arr_data = this.f_all_data.Schedules[0].filter((d: { FName: any; }) => d.FName == event.val)}
    else{
      this.arr_data = this.f_all_data.Schedules[0].filter((d:any) => d.FName == event.val&&d.Stop==this.stpId)
    }

  }
  reset_airline_filter() {
    this.reset_airline_key = false
    this.airlineId = " "
    this.arr_data = this.f_all_data.Schedules[0]
  }

  myOnChangeSlider(event: any) {
    this.arr_data = this.f_all_data.Schedules[0].filter((d: { Fare: { GrandTotal: number; }; }) => d.Fare.GrandTotal <= event.detail.value)
  }


  depDateId: any
  reset_depDate_key = false
  dep_time_filter(event: { isChecked: boolean; val1: string; val2: string; }) {
    this.DEP_TIME.filter(d => {
      d.isChecked = false
    })
    event.isChecked = true
    console.log(event)
    this.reset_depDate_key = true

    this.depDateId = event.val1
    this.arr_data = this.f_all_data.Schedules[0].filter((d: { Itinerary: { DDate: string; }[]; }) =>
      parseInt(d.Itinerary[0].DDate.split('T')[1].split(':')[0]) >= parseInt(event.val1) && parseInt(d.Itinerary[0].DDate.split('T')[1].split(':')[0]) <= parseInt(event.val2)
    )
  }
  reset_depDate_filter() {
    this.reset_depDate_key = false
    this.depDateId = " "
    this.arr_data = this.f_all_data.Schedules[0]
    this.DEP_TIME.filter(d => {
      d.isChecked = false
    })
  }


  arrDateId: any
  reset_arrDate_key = false
  arr_time_filter(event: { isChecked: boolean; val1: string; val2: string; }) {
    console.log(event)
    this.ARR_TIME.filter(d => {
      d.isChecked = false
    })
    event.isChecked = true
    this.reset_arrDate_key = true
    this.arrDateId = event.val1
    this.arr_data = this.f_all_data.Schedules[0].filter((d: { Itinerary: { ADate: string; }[]; }) =>
      parseInt(d.Itinerary[0].ADate.split('T')[1].split(':')[0]) >= parseInt(event.val1) && parseInt(d.Itinerary[0].ADate.split('T')[1].split(':')[0]) <= parseInt(event.val2)
    )

  }
  reset_arrDate_filter() {
    this.reset_arrDate_key = false
    this.arrDateId = " "
    this.arr_data = this.f_all_data.Schedules[0]
    this.ARR_TIME.filter(d => {
      d.isChecked = false
    })
  }

  // *********************      FILTERS END     ************************







  // ******************        FARE CHECK    *********
  fare_chk_res: any
  fchk_id: any
  b_chk_id: any
  fare_diff_show = false
  selectFlight(d: any) {
    let data = JSON.parse(localStorage.getItem("flt_srh_sector") || '{}')
    let f_chk = {
      "Param": data,
      "SelectedFlights": [
        d
      ],
      "GstData": {
        "IsGst": true,
        "GstDetails": {
          "Name": "Kafila Hospitality and Travels Pvt Ltd",
          "Address": "10185-c, Arya samaj Road, Karolbagh",
          "Email": "admin@kafilatravel.in",
          "Mobile": "9899911993",
          "Pin": "110005",
          "State": "Delhi",
          "Type": "S",
          "Gstn": "07AAACD3853F1ZW"
        }
      }
    }

    localStorage.setItem("selectedFlight", JSON.stringify(f_chk))
    this.route.navigate(['home/fpax'])

  }


  farechk(d: any) {
    // console.log(d.Id)
    this.b_chk_id = d.Id

    this.fare_diff_show = false
    this.arr_data.forEach((data: any) => {
      if (data.Id == d.Id) {
        this.fchk_id = data.Id
        this.fare_chk_res = data.Deal
        console.log(data.Deal)
        this.fare_diff_show = true
      }

    })

  }

  incrementDate(dateInput: any) {
    let dateFormatTotime = new Date(dateInput);
    let increasedDate = new Date(dateFormatTotime.getTime() + (1 * 86400000));
    this.nextdate=this.datepipe.transform(increasedDate, 'yyyy-MM-dd');
    return this.datepipe.transform(increasedDate, 'yyyy-MM-dd');
  }

  decrementDate(dateInput: any) {
    let dateFormatTotime = new Date(dateInput);
    let increasedDate = new Date(dateFormatTotime.getTime() - (1 * 86400000));
     this.prevdate=this.datepipe.transform(increasedDate, 'yyyy-MM-dd');
    return this.datepipe.transform(increasedDate, 'yyyy-MM-dd');
  }

  nextdate
  prevdate
   
  


  prvDate() {
    let data = {
      "Trip": "D1",
      "Adt": this.sr_str.Adt,
      "Chd": this.sr_str.Chd,
      "Inf": this.sr_str.Inf,
      "Sector": [
        {
          "Src": this.sr_str.Sector[0].Src,
          "Des": this.sr_str.Sector[0].Des,
          "DDate": this.decrementDate(this.sr_str.Sector[0].DDate)
        }
      ],
      "PF": this.sr_str.PF ,
      "PC": this.sr_str.PC,
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
    this.sr_str = data
    this.apicall(data)

  }


  nxtDate() {
    let data = {
      "Trip": "D1",
      "Adt": this.sr_str.Adt,
      "Chd": this.sr_str.Chd,
      "Inf": this.sr_str.Inf,
      "Sector": [
        {
          "Src": this.sr_str.Sector[0].Src,
          "Des": this.sr_str.Sector[0].Des,
          "DDate": this.incrementDate(this.sr_str.Sector[0].DDate)
        }
      ],
      "PF": this.sr_str.PF ,
      "PC": this.sr_str.PC,
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
    this.sr_str = data
    this.apicall(data)
  }

  navigate() {
    this.route.navigate(['home/fsearch'])
  }


  removeDuplicates(arr: any) {

    return arr.filter((item: any, index: any) => arr.indexOf(item) === index);

  }

}
