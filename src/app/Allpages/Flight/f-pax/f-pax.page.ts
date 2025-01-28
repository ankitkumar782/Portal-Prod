import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PostService } from '../../../Services/Crud_Services/post.service';
export const MAX_SELECTION = 9;
@Component({
  selector: 'app-f-pax',
  templateUrl: './f-pax.page.html',
  styleUrls: ['./f-pax.page.scss'],
})


export class FPaxPage implements OnInit {
  Baggage: any
  isMeal = false
  Meals: any
  istax: any
  isGST: any
  minDate = new Date(new Date().getTime() - 3600 * 1000 * 24 * 30 * 12 * 12).toISOString().split('T')[0];
  INF_MINDATE = new Date(new Date().getTime() - 3600 * 1000 * 24 * 30 * 12 * 2).toISOString().split('T')[0];
  showReview = false
  constructor(private route: Router, private fb: FormBuilder, private datepipe: DatePipe, private post_service: PostService) { }
  f_chk_res: any
  slt_flt: any
  adt_sub_arr: any = FormArray;
  chd_sub_arr: any = FormArray;
  inf_sub_arr: any = FormArray;
  showchild: boolean = false;
  showinfant: boolean = false;
  fare_chk_res: any
  show_fare = false
  btnActive = false
  slt_flt1: any
  isseat = false
  seats: any;
  seats2: any
  rangei = []
  rangej = [0, 1, 2, 3, 4, 5]
  rangei1 = []
  rangej1 = [0, 1, 2, 3, 4, 5]
  totpass = 0;
  Seatsdata1 = { maxReached: false, attr: [] };
  Seatsdata2 = { maxReached: false, attr: [] };
  ghj;
  totst:number=0;
  TOTSEAT:any
  ngOnInit() {


    this.f_chk_res = JSON.parse(localStorage.getItem('selectedFlight') || '{}')
    
      this.post_service.POST("/FFareCheck", this.f_chk_res).subscribe((f) => {
        // console.log(f.FareBreakup.OldFare)
        // console.log(f.FareBreakup.NewFare)
        // console.log(f.FareBreakup.FareDifference)
        this.fare_chk_res = f
        console.log(this.fare_chk_res)
        this.totpass = this.fare_chk_res.Param.Adt + this.fare_chk_res.Param.Chd
        console.log(this.totpass)
        let SelectedFlight = []
        this.fare_chk_res.SelectedFlight.forEach(element => {
          SelectedFlight.push(element)
        });

        let ancl = {
          "Error": this.fare_chk_res.Error,
          "IsFareUpdate": this.fare_chk_res.IsFareUpdate,
          "IsAncl": true,
          "Param": this.fare_chk_res.Param,
          "SelectedFlight": SelectedFlight,
          "FareBreakup": this.fare_chk_res.FareBreakup,
          "GstData": this.fare_chk_res.GstData,
          "Ancl": null
        }



        this.post_service.POST("/FAncl", ancl).subscribe((f) => {
          console.log(f)
          this.totst += parseInt(f.SelectedFlight[0].Stop)  + 1;
          console.log(this.totst)
          if (this.totst == 1) {
          this.seats = f.Ancl.Seat[0]

          for (let i = 0; i < this.seats.length; i++) {
            this.Seatsdata1.attr[i] = [];
            this.rangei.push(i)
            for (let j = 0; j < 6; j++) {
              this.Seatsdata1.attr[i].push({ x: (i), y: (j + 65), selected: false });
            }
          }

          }
          // this.seats=element



          if (this.totst > 1) {
           
            this.seats2 = f.Ancl.Seat[1]
            for (let i = 0; i < this.seats2.length; i++) {
              this.Seatsdata2.attr[i] = [];
              this.rangei1.push(i)
              for (let j = 0; j < 6; j++) {
                this.Seatsdata2.attr[i].push({ x: (i), y: (j + 65), selected: false });
              }
            }
          }

          // this.seats=element






          this.Baggage = f.Ancl.Baggage
          this.Meals = f.Ancl.Meals
        })
        // console.log(this.fare_chk_res)
        this.show_fare = true
        this.btnActive = true
        if (f.IsFareUpdate == true) {
          alert("Fare Updation Detected")
        }
      }, err => {
        alert(err)
      })


    this.slt_flt = this.f_chk_res.SelectedFlights[0];
    this.slt_flt1 = this.f_chk_res.SelectedFlights[1];
      this.TOTSEAT=this.f_chk_res.Param.Adt+this.f_chk_res.Param.Chd
    if (this.f_chk_res.Param.Adt > 0) {
      for (let i = 0; i < this.f_chk_res.Param.Adt; i++) {
        this.adt_sub_arr = this.pax_all_obj.get('adt_sub_arr') as FormArray;
        if (this.adt_sub_arr.length < 10) {
          this.adt_sub_arr.push(this.createItem());
          console.log(this.f_chk_res.Param.Adt)
        }
      }
    }

    if (this.f_chk_res.Param.Chd > 0) {
      for (let i = 0; i < this.f_chk_res.Param.Chd; i++) {
        this.chd_sub_arr = this.pax_all_obj.get('chd_sub_arr') as FormArray;
        if (this.chd_sub_arr.length < 10) {
          this.chd_sub_arr.push(this.createItem1());
        }

      }
      this.showchild = true;
    }


    if (this.f_chk_res.Param.Inf > 0) {
      for (let i = 0; i < this.f_chk_res.Param.Inf; i++) {
        this.inf_sub_arr = this.pax_all_obj.get('inf_sub_arr') as FormArray;
        if (this.inf_sub_arr.length < 10) {
          this.inf_sub_arr.push(this.createItem2());
        }

      }
      this.showinfant = true;
    }


    // setTimeout(() => {
    //   localStorage.clear()
    // }, 5000)

  }
  NewSeat;
  seat: any = FormArray;

  onchangeseat(event) {
    const id = event.target.value;
    const isChecked = event.target.checked;
    console.log(id, isChecked)
    console.log(event)
    // console.log(document.getElementById)

    // this.NewSeat = this.seat.map((d) => {
    //   if (d.id == id) {
    //     d.select = isChecked;
    //     return d
    //   }
    //   return d
    // });
    console.log(this.NewSeat)
  }


  meal = [[], [], [], [], [], [], [], []]
  mealSelct(i, d, k) {
    console.log(i)
    console.log(d)
    console.log(this.fare_chk_res)
    this.meal[k].push(d)
    console.log(this.meal)
  }
  bag = [[], [], [], [], [], [], [], []]
  baggageSelct(i, d, k) {
    console.log(i)
    console.log(d)
    console.log(this.fare_chk_res)
    this.bag[k].push(d)
    console.log(this.bag)
  }

  getControlsadt() {
    return (this.pax_all_obj.get('adt_sub_arr') as FormArray).controls;
  }
  getseatcontrols() {
    return (this.seat_obj.get('seat') as FormArray).controls;
  }
  getControlschd() {
    return (this.pax_all_obj.get('chd_sub_arr') as FormArray).controls;
  }
  getControlsinf() {
    return (this.pax_all_obj.get('inf_sub_arr') as FormArray).controls;
  }

  pax_all_obj: any = this.fb.group({
    adt_sub_arr: this.fb.array([]),
    chd_sub_arr: this.fb.array([]),
    inf_sub_arr: this.fb.array([]),
  })
  seat_obj: any = this.fb.group({
    seat: this.fb.array([]),

  })

  createItem() {
    return this.fb.group({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      PaxType: new FormControl('ADT'),
      Optional: new FormControl(null),
      Meal: new FormControl(null),
      Baggage: new FormControl(null),
      Seat: new FormControl(null),
      Others: new FormControl(null)
    });
  }
  createItem0() {
    return this.fb.group({
      sname: new FormControl('', [Validators.required]),
      // selected: new FormControl('', [Validators.required]),

    });
  }
  createItem1() {
    return this.fb.group({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      PaxType: new FormControl('CHD'),
      Optional: new FormControl(null),
      Meal: new FormControl(null),
      Baggage: new FormControl(null),
      Seat: new FormControl(null),
      Others: new FormControl(null)
    });
  }
  createItem2() {
    return this.fb.group({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      PaxType: new FormControl('INF'),
      Optional: new FormControl(null),
      Meal: new FormControl(null),
      Baggage: new FormControl(null),
      Seat: new FormControl(null),
      Others: new FormControl(null)
    });
  }

  details3 = new FormGroup({

    gsttype: new FormControl(''),
    gstno: new FormControl(''),
    companyname: new FormControl(''),
    email: new FormControl(''),
    mobno: new FormControl(''),
    address: new FormControl(''),
    state: new FormControl(''),
    pin: new FormControl('')
  });


  details4 = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    mobno: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
  });

  reviewObj: any
  totseat=0;
  onSubmit() {
    let d_arr: any[] = []
    let x: any = this.pax_all_obj.value.adt_sub_arr.concat(this.pax_all_obj.value.chd_sub_arr)
    let y: any = x.concat(this.pax_all_obj.value.inf_sub_arr)
    let seat = [];
    let seat2 = [];
    console.log(y)
    console.log(this.seats)
    
    for (let i = 0; i < this.Seatsdata1.attr.length; i++) {

      for (let j = 0; j < this.Seatsdata1.attr[i].length; j++) {
        if (this.Seatsdata1.attr[i][j].selected == true) {
          let num = this.Seatsdata1.attr[i][j].x + 1;
          let alp = String.fromCharCode(this.Seatsdata1.attr[i][j].y);
          num += alp;
          console.log(num)
          if (this.seats[i][j]) {
            seat.push(this.seats[i][j])
          }


        }

      }

    
  }
    if (this.totst > 1) {
      for (let i = 0; i < this.Seatsdata2.attr.length; i++) {

        for (let j = 0; j < this.Seatsdata2.attr[i].length; j++) {
          if (this.Seatsdata2.attr[i][j].selected == true) {
            let num = this.Seatsdata2.attr[i][j].x + 1;
            let alp = String.fromCharCode(this.Seatsdata2.attr[i][j].y);
            num += alp;
            console.log(num)

            seat2.push(this.seats[i][j])


          }

        }

      }
    }
    console.log(seat2)
    let fiseat = []
    for (let i = 0; i < this.seat.length; i++) {
      let aj = []
      aj.push(seat[i])
      if (this.totst > 1) {
        aj.push(seat2[i])
      }
      fiseat.push(aj)
    }

    // if(seat.length==0){
    //   seat=null
    // }
   
    // if(this.meal.length==0){
    //   this.meal=null;
    // }
    //   {
    //     "Trip": 0,
    //     "FCode": "6E",
    //     "FNo": "2716",
    //     "FType": "A321-232",
    //     "Deck": "1",
    //     "Compartemnt": "Y",
    //     "Group": "16",
    //     "SeatCode": "39F",
    //     "Avlt": true,
    //     "SeatRow": 39,
    //     "Currency": "INR",
    //     "SsrDesc": "WINDOW",
    //     "Price": 150.0000,
    //     "DDate": "2024-01-03T02:00:00",
    //     "Src": "DEL",
    //     "Des": "BOM",
    //     "OI": null,
    //     "Leg": 0
    // }
    y.forEach((d, index) => {
      let z = this.datepipe.transform(d.age, 'yyyy-MM-dd')
      let f = {
        "PaxType": d.PaxType,
        "Title": d.title,
        "FName": d.fname,
        "LName": d.lname,
        "Gender": d.sex,
        "Dob": d.age,
        "Optional": {
          "TicketNumber": "",
          "PassportNo": "",
          "PassportExpiryDate": "",
          "FrequentFlyerNo": "",
          "Nationality": "IN",
          "ResidentCountry": "IN"
        },
        "Meal": this.nullfunc(this.meal[index]),
        "Baggage": this.nullfunc(this.bag[index]),
        "Seat": this.nullfunc2(fiseat[index], seat),
        "Others": null

      }
      d_arr.push(f)
    });


     

    let fobj = {
      "FareChkRes": {
        "IsFareUpdate": true,
        "Param": this.fare_chk_res.Param,
        "SelectedFlight": this.fare_chk_res.SelectedFlight,
        "FareBreakup": this.fare_chk_res.FareBreakup,
        "GstData": this.fare_chk_res.GstData
      },
      "PaxInfo": {
        "GstData": null,
        "PnrInfo": null,
        "PaxEmail": this.details4.value.email,
        "PaxMobile": this.details4.value.mobno,
        "Passengers": d_arr
      }
    }




    console.log(fobj)
    // this.showReview = true
    // this.reviewObj = fobj
    localStorage.setItem("f_obj", JSON.stringify(fobj))
    this.route.navigate(['home/fpayment'])

  }


  nullfunc(a) {
    if (a.length == 0) {
      return null
    }

    else {
      return a
    }
  }
  nullfunc2(a, b) {
    if (a.length == 0) {
      return null
    }
    if (b.length == 0) {
      return null
    }

    else {
      if (this.totst > 1) {
        return a
      }
      else {
        return b
      }
    }
  }


  // stops: any
  // a: any
  // check(g: any) {
  //   this.a = g
  //   if (this.stops == true) {
  //     this.stops = !this.stops
  //   }
  //   this.stops = !this.stops

  // }


  get f() {
    return this.details4.controls;
  }

  hii = true
  hii2 = false

  axilary() {
    this.isseat = !this.isseat
  }
  isMealselect() {
    this.isMeal = !this.isMeal
  }
  isbaggage() {
    this.isBaggageselect = !this.isBaggageselect
  }

  isBaggageselect = false
  i = 0;
  counter(a) {

    console.log(a)
    const selected = (
      [].concat.apply([], (
        this.Seatsdata1.attr.map(
          row => row.map(
            seat => seat.selected
           
          )
        )
      ))
    ).filter(status => status).length;
    console.log(this.Seatsdata1)

    if (selected === this.TOTSEAT) {
      this.Seatsdata1.maxReached = true;
      
    } else {
      this.Seatsdata1.maxReached = false;
    }

   
  }
  counter2(a) {

    console.log(a)
    const selected = (
      [].concat.apply([], (
        this.Seatsdata2.attr.map(
          row => row.map(
            seat => seat.selected

          )
        )
      ))
    ).filter(status => status).length;
    console.log(this.Seatsdata1)

    if (selected === this.TOTSEAT) {
      this.Seatsdata2.maxReached = true;
      
    } else {
      this.Seatsdata2.maxReached = false;
    }
  }
}
