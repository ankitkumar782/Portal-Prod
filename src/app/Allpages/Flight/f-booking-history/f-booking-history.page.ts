import { OnInit, Component } from '@angular/core';
import { PostService } from '../../../Services/Crud_Services/post.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import { IonButton, IonLoading } from '@ionic/angular/standalone';
@Component({
  selector: 'app-f-booking-history',
  templateUrl: './f-booking-history.page.html',
  styleUrls: ['./f-booking-history.page.scss'],
  // imports: [IonButton, IonLoading],
})
export class FBookingHistoryPage implements OnInit {
  remarksCommit = new FormGroup({
    ClientRemarkCharge: new FormControl('', [Validators.required]),
    ClientRemarkCommit: new FormControl('', [Validators.required]),
    remark: new FormControl('',),
    rescode: new FormControl('', [Validators.required])
  });


  resultArr: any
  FromData2 = ''
  wait = true
  maxDate = new Date(new Date().getTime()).toISOString().split('T')[0];
  amt: number = 0;
  pdfData: any;
  from = this.maxDate
  to = this.maxDate
  Token: any;
  Agentid: any;
  ShowCancelModel = false;
  ShowModelDATA = true;
  cancelBookingId: any;
  isModalOpen = false;
  ticket = false
  ticketConfirmation: boolean = false;
  Airlinecharge: any;
  KafilaCharge: any;
  CustomerAmount: any;
  airlinerefund: any;
  airlineToken: any;
  totalFare: any;
  flightcode: any;
  ICanceled: any;
  serviceCharge: any;
  refundableammo: any;
  pnrOf: any;
  charge: any;
  tax: any
  env: any
  remark = ""
  constructor(private pstService: PostService, private route: ActivatedRoute) { }
  id
  ngOnInit() {
    this.env = sessionStorage.getItem("ENV")
    this.Token = sessionStorage.getItem("Token")
    this.Agentid = sessionStorage.getItem("Agentid")
    this.apiHit()
   
  }


  CancelTicket(d: any) {
    this.ShowCancelModel = true;
    this.ShowModelDATA = false;
    // console.log(d);
    // console.log(d.bookingId);
    this.cancelBookingId = d.BookingId


  }

  reasonarr = []
  CancelTicket2(d: any) {
    this.ShowCancelModel = true;
    this.ShowModelDATA = false;

    var b = `https://fhapip.ksofttechnology.com/api/FReport/ADMIN?P_TYPE=API&R_TYPE=FLIGHT&R_NAME=GetCRList&AID=${this.Agentid}&TOKEN=${this.Token}`

    this.pstService.GET(b).subscribe((res) => {
      this.reasonarr = res
      this.showtable = true
      console.log(res)

    },
      (err) => {
        console.log(err)
        this.wait = true
      })
    
    this.cancelBookingId = d.BookingId
    this.traceid = d.TransId
  }
  traceid

  indexHidden = false
  select() {
    this.showtable = false
    this.loader = true
    let res = {}
    console.log(this.remarksCommit.value)

    this.reasonarr.forEach((ele) => {
      if (ele.ReasonCode == this.remarksCommit.value.rescode) {
        res = {
          "ReasonCode": ele.ReasonCode,
          "Reason": ele.Reason,
          "Scenarios": ele.Scenarios,
          "IsVoluntary": ele.IsVoluntary,
          "Remarks": ele.Remarks
        }
      }
    })

    let cance =
    {
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "CANCEL",
      "R_DATA": {
        "ACTION": "CANCEL_CHARGE",
        "BOOKING_ID": this.cancelBookingId,
        "CANCEL_TYPE": "FULL_CANCELLATION",
        "Trace_Id": "",
        "REASON":res
      },
      "AID": this.Agentid,
      "MODULE": "B2B",
      "IP": "182.73.146.154",
      "TOKEN": this.Token,
      "ENV": this.env,
      "Version": "1.0.0.0.0.0"
    }
    console.log(cance);

    this.pstService.POST('/FCancel', cance).subscribe((res) => {
      console.log(res?.Charges)
      
      if(res?.Charges){
        this.loader = false
        alert("Reason Submitted ")
        this.showcharges = true
        this.hideconfirmbutton=true
        this.showtable = false
        this.charge=res
        this.trac=res.Req.R_DATA.TRACE_ID
        this.Airlinecharge = res.Charges.AirlineCancellationFee;
        this.KafilaCharge = res.Charges.ServiceFee;
        this.CustomerAmount = res.Charges.RefundableAmt;
        this.airlinerefund = res.Charges.AirlineRefund;
        this.airlineToken = res.Charges.AirlineToken;
        this.totalFare = res.Charges.Fare
        this.flightcode = res.Charges.FlightCode;
        this.pnrOf = res.Charges.Pnr;
        this.refundableammo = res.Charges.RefundableAmt;
        this.serviceCharge = res.Charges.ServiceFee;
        this.loader = false
      }
      else if(res.Status=="Failed"){
        this.loader = false
        alert(res.ErrorMessage)
        location.reload();
      }
      else if(res.Status=="PENDING"){
        this.loader = false
        this.showcharges = true
        this.showtable = false
        this.charge=res
      }
      else if(res.Result=="unable to cancel."){
        alert(res.Result)
        this.loader = false
        location.reload();
      }
      else{
        this.loader = false
        alert("Reason Not Submitted")
        location.reload();
      }
    },
      (err) => {
        console.log(err)
        this.wait = true
      })

  }
  button = false
  trac
  showcharges = false
  showtable = false
  loader=false
  goBackcancel() {
    this.ShowCancelModel = false;
    this.showcharges = false
    this.showstatus = false
    this.showtable=false  
    this.ShowModelDATA = true;
    window.location.reload();
    // console.log("Cancel button pressed");
  }
  showstatus = false
  statusresponse
  confirmCancellation() {

    let cancelTicket =
    {
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "CANCEL",
      "R_DATA": {
        "ACTION": "CANCEL_COMMIT",
        "BOOKING_ID": this.cancelBookingId,
        "CANCEL_TYPE": "FULL_CANCELLATION",
        "TRACE_ID": this.trac,
        "REASON": {
          "ReasonCode": "CTP",
          "Reason": "Change In Travels Plans",
          "Scenarios": "Cancellation as per fare rules",
          "IsVoluntary": true,
          "Remarks": ""
        },
        // "Charges": this.charge.Charges
        "Charges": {
          "FlightCode": this.flightcode,
          "Pnr": this.pnrOf,
          "SplitedPnr": null,
          "Fare": this.totalFare,
          "AirlineCancellationFee": this.Airlinecharge,
          "AirlineRefund": this.airlinerefund,
          "ServiceFee": this.serviceCharge,
          "RefundableAmt": this.refundableammo,
          "IsCanceled": this.ticketConfirmation,
          "IsError": false,
          "Description": null,
          "AirlineToken": this.airlineToken
        }
      },
      "AID": this.Agentid,
      "MODULE": "B2B",
      "IP": "182.73.146.154",
      "TOKEN": this.Token,
      "ENV": this.env,
      "Version": "1.0.0.0.0.0"
    }
    console.log(cancelTicket)
    this.pstService.POST('/FCancel', cancelTicket).subscribe((res) => {
      console.log(res)
      if (res.Status == 'Failed') {
        alert("Failed to cancel the pnr" + res?.ErrorMessage)
      }
      else if (res.Status == 'PENDING') {
        alert(" Pending" + res?.ErrorMessage)
      }
      else if(res?.R_DATA?.Charges?.IsCanceled) {
        alert("pnr cancelled succesfully")
        this.showtable = false;
        this.showcharges = false;
        this.showstatus = false;
      this.ShowModelDATA = true;
      window.location.reload();
      }
    },
      (err) => {
        console.log(err)
        this.wait = true
      })
  }




  statusof2(d:any) {
    // this.ShowCancelModel = true;
    // this.ShowModelDATA = true;


    // console.log("Pressed Confirmed Button ");

    this.cancelBookingId = d.BookingId

    var a = `${this.get_url}?P_TYPE=API&R_TYPE=FLIGHT&R_NAME=GetCancelCommitStatus&AID=${this.Agentid}&TOKEN=${this.Token}&DATA=${d.BookingId}`
    console.log(a)
    this.pstService.GET(a).subscribe((res) => {
      console.log(res)
      this.statusresponse = res
      if(this.statusresponse?.Status=='PENDING'){
        alert(this.statusresponse.WarningMessage)
      }
      console.log(this.statusresponse?.IsCancelled)
      if (this.statusresponse?.IsCancelled) {
        alert("your ticket is cancelled")
        this.ShowCancelModel = false
        // window.location.reload();
      }
      else  {
        alert("NO data Found")
      }


      // this.showtable = false
      // this.ShowCancelModel = true;
      // this.ShowModelDATA = false;
      // alert("The PNR has been Cancelled. " + " The refund is underprocess. " + this.CustomerAmount)
    },
      (err) => {
        console.log(err)
        this.wait = true
      })
  }

  // statusof2(d) {
  //   // this.ShowCancelModel = true;
  //   // this.ShowModelDATA = true;


  //   // console.log("Pressed Confirmed Button ");

  //   this.cancelBookingId = d.BookingId

  //   var a = `http://fhapip.ksofttechnology.com/api/FReport/ADMIN?P_TYPE=API&R_TYPE=FLIGHT&R_NAME=GetCancelCommitStatus&AID=${this.Agentid}&TOKEN=${this.Token}&DATA=${d.BookingId}`
  //   console.log(a)
  //   this.pstService.GET(a).subscribe((res) => {
  //     console.log(res)
  //     this.statusresponse = res
  //     console.log(this.statusresponse.IsCancelled)
  //     if (this.statusresponse.IsCancelled) {
  //       alert("your ticket is cancelled")
  //       this.ShowCancelModel = false
  //       window.location.reload();
  //     }
  //     else {

  //     }


  //     // this.showtable = false
  //     // this.ShowCancelModel = true;
  //     // this.ShowModelDATA = false;
  //     // alert("The PNR has been Cancelled. " + " The refund is underprocess. " + this.CustomerAmount)
  //   },
  //     (err) => {
  //       console.log(err)
  //       this.wait = true
  //     })
  // }
  showstatuscharges = false
  hideconfirmbutton = false
 get_url="http://fhapip.ksofttechnology.com/api/FReport/ADMIN"
  data1 = ''
  data2 = ''
  cancelcommit() {
    let data = {
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "CANCEL",
      "R_DATA": {
        "ACTION": "CANCEL_COMMIT",
        "BOOKING_ID": this.statusresponse.Req.R_DATA.BOOKING_ID,
        "CANCEL_TYPE": "FULL_CANCELLATION",
        "REASON": this.statusresponse.Req.R_DATA.REASON,
        "TRACE_ID": this.statusresponse.Req.R_DATA.TRACE_ID,
        "Charges": this.statusresponse.Charges,
        "Error": null,
        "Status": {
          "IsCCStaffApprovedCancelCharge": this.statusresponse.Status.IsCCStaffApprovedCancelCharge,
          "CCStaffRemarkOnCancelCharge": this.statusresponse.Status.CCStaffRemarkOnCancelCharge,
          "CancelChargeBy": this.statusresponse.Status.CancelChargeBy,
          "IsClientApprovedCancelCharge": true,
          "ClientRemarkOnCancelCharge": this.data1,
          "IsClientApprovedCancelCommit": true,
          "ClientRemarkOnCancelCommit": this.data2,
          "IsCCStaffApprovedCancelCommit": false,
          "CCStaffRemarkOnCancelCommit": "",
          "CancelCommitBy": ""
        }
      },
      "AID": this.Agentid,
      "MODULE": "B2B",
      "IP": "182.73.146.154",
      "TOKEN": this.Token,
      "ENV": this.env,
      "Version": "1.0.0.0.0.0"
    }
    this.pstService.POST('/FCancel', data).subscribe((res) => {
      console.log(res)
      this.ShowCancelModel = false;
      this.ShowModelDATA = true;
    })

  }

  fcode = ''
  status = ''
  apiHit() {
    let obj = {
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "FlightBookingHistory",
      "R_DATA": {
        "FROM_DATE": this.from + "T00:00:00.001Z",
        "TO_DATE": this.to + "T23:59:59.999Z",
        "F_CODE": "",
        "STATUS": this.FromData2
      },
      "AID": this.Agentid,
      "MODULE": "B2B",
      "IP": "182.73.146.154",
      "TOKEN": this.Token,
      "ENV": this.env,
      "Version": "1.0.0.0.0.0"
    }

    // {
    //   "P_TYPE": "API",
    //   "R_TYPE": "FLIGHT",
    //   "R_NAME": "FlightBookingHistory",
    //   "R_DATA": {
    //     "FROM_DATE": this.from + "T00:00:00.097",
    //     "TO_DATE": this.to + "T23:59:59.097",
    //     "F_CODE": "",
    //     "STATUS": this.FromData
    //   },
    //   "AID": this.Agentid,
    //   "MODULE": "B2B",
    //   "IP": "182.73.146.154",
    //   "TOKEN": this.Token,
    //   "ENV": "P",
    //   "Version": "1.0.0.0.0.0"
    // }

    console.log(obj)

    this.pstService.POST('/FReport', obj).subscribe((res) => {
      for (let i = 0; i < Math.floor(res.length / 2); i++) {
        [res[i], res[res.length - 1 - i]] = [res[res.length - 1 - i], res[i]];
      }
      console.log(res)
      this.amt = 0
      this.pdfData = res.map(Object.values);
      for (let x of res) {
        this.amt += parseInt(x.totalFare)
      }
      this.resultArr = res
      this.wait = false
    },
      (err) => {
        console.log(err)
        this.wait = true
      })
  }

  fileName = 'BookingReport.xlsx';
  exportexcel() {
    let element = document.getElementById('tabl');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  openPDF(): void {
    var doc = new jsPDF('l', 'mm', [512, 392]);
    doc.setFontSize(5);
    doc.setTextColor(100);
    (doc as any).autoTable({
      head: [['FID', 'RID', 'Email Id', 'Booking Id', 'Amount', 'PNR', 'DEP Date', 'ETIME', 'Status', 'OI', 'IP']],
      body: this.pdfData,
    })

    doc.output('dataurlnewwindow')
    
    doc.save('BookingReport' + this.maxDate + '.pdf');
  }
  PNR(d: any) {
    console.log(d)
    let obj = {

      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "FlightBookingResponse",
      "R_DATA": {
        "TYPE": "PNRRES",
        "BOOKING_ID": d.BookingId,
        "TRACE_ID": "",
        "AGENT_ID": ""
      },
      "AID": this.Agentid,
      "MODULE": "B2B",
      "IP": "182.73.146.154",
      "TOKEN": this.Token,
      "ENV": this.env,
      "Version": "1.0.0.0.0.0"
    }

    console.log(obj);
    this.pstService.POST('/FReport', obj).subscribe(result => {
      console.log(result)
      for (let i = 0; i < Math.floor(result.length / 2); i++) {
        [result[i], result[result.length - 1 - i]] = [result[result.length - 1 - i], result[i]];
      }
      this.test = result
      this.showticket = true
      this.showbooking = false

      this.test.FareBreakup.Journeys.forEach((ele) => {
        ele.Segments.forEach((seg) => {
          this.tax = seg.TaxBreakup
          // console.log(this.tax)
          seg.TaxBreakup.forEach((TaxBreakup) => {
            // console.log(TaxBreakup)
          })
        })
      })

      this.test.PaxInfo.Passengers.forEach((ele) => {
        this.seat.push(ele.Seat)
        // ele.Seat.forEach((ele)=>{
        //   this.seat.push(ele.Seat)
        // })
        // this.seat.Seat?.forEach((a) => {
        //   this.seatamount += a.Price
        //   console.log(a.Price)
        // })
  
      })
  
      this.test.PaxInfo.Passengers?.forEach((ele) => {
        this.meal = ele
        this.meal.Meal?.forEach((a) => {
          this.mealamount += a.Price
          // console.log(a.Price)
        })
  
      })



    }, (error) => {
      console.log(error)
    })
  }
  seat=[]
  meal
  mealamount
  showticket = false
  showbooking = true
  test: any
  hide() {
    this.showticket = false
    this.showbooking = true
  }


  

  search = []
  addbutton = true
  formsearcg = false
  addvalue() {
    this.addbutton = false
    this.formsearcg = true
  }


  removevalue(i:any) {
    this.search.splice(i, 1);
  }

  FromData = ""
  data = ""
  bookinid
  pnr
  fname
  lname

  toDate
  fromDate
  StatusKey

  // condition() {
  // }
  searchBy() {
    if (this.FromData == "BookingId") {
      this.bookinid = this.data
    }
    else {
      this.bookinid = ''
    }
    if (this.FromData == "PNR") {
      this.pnr = this.data
    }
    else {
      this.pnr = ''
    }
    if (this.FromData == "FName") {
      this.fname = this.data
    }
    else {
      this.fname = ''
    }
    if (this.FromData == "LName") {
      this.lname = this.data
    }
    else {
      this.lname = ''
    }
    console.log(this.FromData, this.data)


    let obj = {
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "USearch",
      "R_DATA": {
        "FromDate": "",
        "ToDate": "",
        "Env": "P",
        "Pnr": this.pnr,
        "FName": this.fname,
        "LName": this.lname,
        "BookingId": this.bookinid

      },
      "AID": this.Agentid,
      "MODULE": "B2B",
      "IP": "182.73.146.154",
      "TOKEN": this.Token,
      "ENV": this.env,
      "Version": "1.0.0.0.0.0"
    }
    console.log(obj)
    this.pstService.POST('/FReport', obj).subscribe((res) => {
      console.log(res)
      
      this.resultArr = res
      this.resultArr.forEach(ele => {
        //  console.log(ele.Pnr)        
      });
     

    },
      (err) => {
        console.log(err)
      })
  }




}