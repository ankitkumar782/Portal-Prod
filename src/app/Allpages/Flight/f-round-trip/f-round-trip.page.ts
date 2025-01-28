import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../Services/Other_Services/common.service';
import { Subject } from 'rxjs';
import { PopoverController, LoadingController } from '@ionic/angular';
import { FlightSearchPopoverComponent } from '../../../components/flight-search-popover/flight-search-popover.component';
import { PostService } from '../../../Services/Crud_Services/post.service';
@Component({
  selector: 'app-f-round-trip',
  templateUrl: './f-round-trip.page.html',
  styleUrls: ['./f-round-trip.page.scss'],
})
export class FRoundTripPage implements OnInit {
  isSkelton = true
  y:any
  Skelton = false
  skArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 5, 6, 1, 2, 3, 1, 2, 3, 1, 2, 3, 12, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
  unsubscribe$: Subject<boolean> = new Subject();
  panelOpenState = false;
  all_dates = [];
  srh_flt = false
  minDate: string;
  constructor(
    private route: Router,
    private cms_service: CommonService,
    public popoverController: PopoverController,
    public loadingController: LoadingController,
    private post_service: PostService
  ) { }
  f_all_data: any
  arr_data: any
  arr_data1: any
  t_type = "0"
  data = false
  maxDate: any
  public STOPS = [
    { val: '0', Name: 'Non Stop', isChecked: false },
    { val: '1', Name: '1 Stop', isChecked: false },
    { val: '2', Name: '2 Stop', isChecked: false }
  ];
  public STOPS_RET = [
    { val: '0', Name: 'Non Stop', isChecked: false },
    { val: '1', Name: '1 Stop', isChecked: false },
    { val: '2', Name: '2 Stop', isChecked: false }
  ];
  public DEP_TIME = [
    { val1: '0', val2: '6', isChecked: false },
    { val1: '6', val2: '12', isChecked: false },
    { val1: '12', val2: '18', isChecked: false },
    { val1: '18', val2: '24', isChecked: false }
  ];
  public DEP_TIME_RET = [
    { val1: '0', val2: '6', isChecked: false },
    { val1: '6', val2: '12', isChecked: false },
    { val1: '12', val2: '18', isChecked: false },
    { val1: '18', val2: '24', isChecked: false }
  ];
  public ARR_TIME = [
    { val1: '00', val2: '06', isChecked: false },
    { val1: '06', val2: '12', isChecked: false },
    { val1: '12', val2: '18', isChecked: false },
    { val1: '18', val2: '24', isChecked: false }
  ];
  public ARR_TIME_RET = [
    { val1: '00', val2: '06', isChecked: false },
    { val1: '06', val2: '12', isChecked: false },
    { val1: '12', val2: '18', isChecked: false },
    { val1: '18', val2: '24', isChecked: false }
  ];
  public Come_FLIGHTS = [];
  up1 = false
  down1 = true
  up2 = false
  down2 = true
  background: ThemePalette = 'primary'
  sr_str: any
  arp: any
  arp_new: any
  update() {
    // this.cms_service.nextCount()
  }
  selected_flight_1: any
  selected_flight_2: any
  dnf = false
  ngOnInit() {
    let data = JSON.parse(localStorage.getItem("flt_srh_sector"))
    this.sr_str = data
    this.apicall(data)
    // let cnrt_f_data = localStorage.getItem("All_Flight")
    // if (cnrt_f_data !== "") {
    //   this.data = true
    //   this.f_all_data = JSON.parse(cnrt_f_data)
    //   this.sr_str = this.f_all_data.Param
    //   this.arr_data = this.f_all_data.Schedules[0]
    //   this.arr_data1 = this.f_all_data.Schedules[1]
    //   this.selected_flight_1 = this.f_all_data.Schedules[0][0]
    //   this.selected_flight_2 = this.f_all_data.Schedules[1][0]


    //   let uniqueChars = [];
    //   this.arr_data.forEach((c) => {
    //     if (!uniqueChars.includes(c.FName)) {
    //       uniqueChars.push(c.FName);
    //     }
    //   })
    //   uniqueChars.forEach((d) => {
    //     this.Come_FLIGHTS.push({ val: d, isChecked: false })
    //   })


    // }

  }


apicall(data) {
  console.log(data)
  this.isSkelton = true
  this.post_service.POST("/FSearch", data).subscribe((Flight) => {
    console.log(Flight)
    
    
      this.isSkelton = false
      this.Skelton = true
      this.f_all_data = Flight
      this.arr_data = this.f_all_data.Schedules[0]
      this.arr_data1 = this.f_all_data.Schedules[1]
      this.selected_flight_1 = this.f_all_data.Schedules[0][0]
      this.selected_flight_2 = this.f_all_data.Schedules[1][0]
      let uniqueChars = [];
      this.arr_data.forEach((c) => {
        if (!uniqueChars.includes(c.FName)) {
          uniqueChars.push(c.FName);
        }
      })
      uniqueChars.forEach((d) => {
        this.Come_FLIGHTS.push({ val: d, isChecked: false })
      })
    }

  , error => {
    this.dnf = true
    this.isSkelton = false
    this.Skelton = false


  })

}


sortBalAsc() {
  this.down1 = false
  this.up1 = true
  return this.arr_data.sort((a: { Fare: { GrandTotal: number; }; }, b: { Fare: { GrandTotal: number; }; }) => {
    return a.Fare.GrandTotal - b.Fare.GrandTotal;
  });
}
sortBalDesc() {
  this.down1 = true
  this.up1 = false
  return this.arr_data.sort((a: { Fare: { GrandTotal: number; }; }, b: { Fare: { GrandTotal: number; }; }) => {
    return b.Fare.GrandTotal - a.Fare.GrandTotal;
  });
}


sortBalAsc_RET() {
  this.down2 = false
  this.up2 = true
  return this.arr_data1.sort((a: { Fare: { GrandTotal: number; }; }, b: { Fare: { GrandTotal: number; }; }) => {
    return a.Fare.GrandTotal - b.Fare.GrandTotal;
  });
}
sortBalDesc_RET() {
  this.down2 = true
  this.up2 = false
  return this.arr_data1.sort((a: { Fare: { GrandTotal: number; }; }, b: { Fare: { GrandTotal: number; }; }) => {
    return b.Fare.GrandTotal - a.Fare.GrandTotal;
  });
}
selectFlight(d) {
  let arr=[]




  this.selected_flight_1
  this.selected_flight_2
 
  arr.push(this.selected_flight_1,this.selected_flight_2)
  let f_chk = {
    "Param": this.sr_str,
    "SelectedFlights": 
      arr
    ,
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
  console.log(f_chk)
  localStorage.setItem("selectedFlight", JSON.stringify(f_chk))
  this.route.navigate(['home/fpax'])
}



// *********************      FILTERS START     ************************



stop_filter(event: { isChecked: boolean; val: any; }) {
  console.log(event)
  if (event.isChecked === true) {
    this.arr_data = this.f_all_data.Schedules[0].filter((d: { Stop: any; }) => d.Stop == event.val)
  }
  else {
    this.arr_data = this.f_all_data.Schedules[0]
  }

}

dep_time_filter(event: { isChecked: boolean; val1: string; val2: string; }) {
  if (event.isChecked == true) {
    this.arr_data = this.f_all_data.Schedules[0].filter((d: { Itinerary: { DDate: string; }[]; }) =>
      parseInt(d.Itinerary[0].DDate.split('T')[1].split(':')[0]) >= parseInt(event.val1) && parseInt(d.Itinerary[0].DDate.split('T')[1].split(':')[0]) <= parseInt(event.val2)
    )
  }
  else {
    this.arr_data = this.f_all_data.Schedules[0]
  }
}



arr_time_filter(event: { isChecked: boolean; val1: string; val2: string; }) {
  if (event.isChecked == true) {
    this.arr_data = this.f_all_data.Schedules[0].filter((d: { Itinerary: { ADate: string; }[]; }) =>
      parseInt(d.Itinerary[0].ADate.split('T')[1].split(':')[0]) >= parseInt(event.val1) && parseInt(d.Itinerary[0].ADate.split('T')[1].split(':')[0]) <= parseInt(event.val2)
    )
  }
  else {
    this.arr_data = this.f_all_data.Schedules[0]
  }
}

flt_name_filter(event) {
  console.log(event)
  if (event.isChecked == true) {
    this.arr_data = this.f_all_data.Schedules[0].filter((d: { FName: any; }) => d.FName == event.val)
    this.arr_data1 = this.f_all_data.Schedules[1].filter((d: { FName: any; }) => d.FName == event.val)
  }
  else {
    this.arr_data = this.f_all_data.Schedules[0]
    this.arr_data1 = this.f_all_data.Schedules[1]
  }
}


// *********************      FILTERS END     ************************




// *********************   RETURN   FILTERS START     ************************
stop_filter_ret(event: { isChecked: boolean; val: any; }) {
  console.log(event)
  if (event.isChecked === true) {
    this.arr_data1 = this.f_all_data.Schedules[1].filter((d: { Stop: any; }) => d.Stop == event.val)
  }
  else {
    this.arr_data1 = this.f_all_data.Schedules[1]
  }

}

dep_time_filter_ret(event: { isChecked: boolean; val1: string; val2: string; }) {
  if (event.isChecked == true) {
    this.arr_data1 = this.f_all_data.Schedules[1].filter((d: { Itinerary: { DDate: string; }[]; }) =>
      parseInt(d.Itinerary[0].DDate.split('T')[1].split(':')[0]) >= parseInt(event.val1) && parseInt(d.Itinerary[0].DDate.split('T')[1].split(':')[0]) <= parseInt(event.val2)
    )
  }
  else {
    this.arr_data1 = this.f_all_data.Schedules[1]
  }
}



arr_time_filter_ret(event: { isChecked: boolean; val1: string; val2: string; }) {
  if (event.isChecked == true) {
    this.arr_data1 = this.f_all_data.Schedules[1].filter((d: { Itinerary: { ADate: string; }[]; }) =>
      parseInt(d.Itinerary[0].ADate.split('T')[1].split(':')[0]) >= parseInt(event.val1) && parseInt(d.Itinerary[0].ADate.split('T')[1].split(':')[0]) <= parseInt(event.val2)
    )
  }
  else {
    this.arr_data1 = this.f_all_data.Schedules[1]
  }
}
// *********************   RETURN   FILTERS END     ************************






































// **************************       ROUND TRIP    ***************************
side_div = false
bottomHeight = false

side_div_active() {

  if (this.side_div == true) {
    this.side_div = false
  }
  else {
    this.side_div = true
  }

}
showchd=false
showinf=false
chk_id = 0
clicked(n) {
  this.chk_id = n.Id
  console.log(n)
  this.selected_flight_1 = n
  if(this.selected_flight_1.Fare.Chd!=null){
    this.showchd=true
    console.log(this.showchd)
  }
  
  if(this.selected_flight_1.Fare.Inf!=null){
    this.showinf=true
  }

}
chk_id_ret = 0
clicked_ret(v) {
  this.chk_id_ret = v.Id
  console.log(v)
  this.selected_flight_2 = v
  if(this.selected_flight_1.Fare.Chd!=null){
    this.showchd=true
    console.log(this.showchd)
  }
  
  if(this.selected_flight_1.Fare.Inf!=null){
    this.showinf=true
  }
}

showBottomDivFull() {
  // this.bottomHeight = true
  if (this.bottomHeight == true) {
    this.bottomHeight = false
  }
  else {
    this.bottomHeight = true
  }
}

// **********************************   API UNSUBSCIBE *****************************
ngOnDestroy() {
  this.unsubscribe$.next(true);
  this.unsubscribe$.complete();
}



// ********************************* MODIFY SEARCH *********************************
modeify() {

}
  async presentPopover(ev: any) {
  const searchpopover = await this.popoverController.create({
    component: FlightSearchPopoverComponent,
    // event: ev,
    cssClass: 'modify',
    translucent: false,
    // mode: 'ios',
    animated: true,
    showBackdrop: true,
    componentProps: {
      onClick: () => {
        searchpopover.dismiss();
      },
    },

  });
  // searchpopover.onDidDismiss().then(() => {

  // });
  return await searchpopover.present();
}

}
