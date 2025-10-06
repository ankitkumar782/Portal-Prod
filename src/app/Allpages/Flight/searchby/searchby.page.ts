import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../Services/Crud_Services/post.service';
import * as XLSX from 'xlsx';
// import { Subject } from 'rxjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-searchby',
  templateUrl: './searchby.page.html',
  styleUrls: ['./searchby.page.scss'],
})
export class SearchbyPage implements OnInit {
  remarksCommit = new FormGroup({
    ClientRemarkCharge: new FormControl('', [Validators.required]),
    ClientRemarkCommit: new FormControl('', [Validators.required]),
    remark: new FormControl('',),
    rescode: new FormControl('', [Validators.required])
  });

  searchbydata = new FormGroup({
    Datatype: new FormControl('', [Validators.required]),
    Datavalue: new FormControl('', [Validators.required]),

  });

  maxDate = new Date(new Date().getTime()).toISOString().split('T')[0];
  amt: number = 0;
  pdfData: any;
  FromData = ""
  data = ""
  bookinid
  pnr
  wait = true
  fname
  lname
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

  toDate
  fromDate
  meal;
  mealamount;
  seat = [];
  loader: boolean = false;
  // env: string;
  constructor(private pstService: PostService) { }
  searchBy() {
    this.FromData = this.searchbydata.value.Datatype;

    if (this.FromData == "BookingId") {
      this.bookinid = this.searchbydata.value.Datavalue
    }
    else {
      this.bookinid = ''
    }
    if (this.FromData == "PNR") {
      this.pnr = this.searchbydata.value.Datavalue
      console.log(this.pnr)
    }
    else {
      this.pnr = ''
    }
    if (this.FromData == "FName") {
      this.fname = this.searchbydata.value.Datavalue
    }
    else {
      this.fname = ''
    }
    if (this.FromData == "LName") {
      this.lname = this.searchbydata.value.Datavalue
    }
    else {
      this.lname = ''
    }
    console.log(this.FromData, this.pnr)
    let obj = {
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "USearch",
      "R_DATA": {
        "FromDate": "",
        "ToDate": "",
        "Env": this.env,
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
      this.isCheckedArr = new Array(this.resultArr[0].PaxName.length).fill(false);

    },
      (err) => {
        console.log(err)
      })
  }
  Token
  Agentid
  resultArr
  // tax
  ngOnInit() {
    this.env = sessionStorage.getItem("ENV")
    this.Token = sessionStorage.getItem("Token")
    this.Agentid = sessionStorage.getItem("Agentid")
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
          console.log(this.tax)
          seg.TaxBreakup.forEach((TaxBreakup) => {
            console.log(TaxBreakup)
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

  showticket = false
  showbooking = true
  test: any
  hide() {
    this.showticket = false
    this.showbooking = true
  }
  fileName = 'SearchbyReport.xlsx';
  exportexcel(): void {
    let element = document.getElementById('tab6');
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
    // below line for Open PDF document in new tab
    doc.output('dataurlnewwindow')
    // below line for Download PDF document  
    doc.save('BookingReport' + this.maxDate + '.pdf');
  }
  CancelTicket(d: any) {
    this.ShowCancelModel = true;
    this.ShowModelDATA = false;
    // console.log(d);
    // console.log(d.bookingId);
    this.cancelBookingId = d.BookingId
    location.reload();


  }

  reasonarr = []
  CancelTicket2(d: any, i: any) {
    this.ShowCancelModel = true;
    this.ShowModelDATA = false;
    this.index = i;
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
    // console.log(d);
    // console.log(d.bookingId);
    this.cancelBookingId = d.BookingId
    this.traceid = d.TransId
  }
  traceid
  indexHidden = false
  cancel_charge_req_function() {
    let res = {}
    // console.log(this.remarksCommit.value)
    this.showtable = false
    this.loader = true
    this.reasonarr.forEach((ele) => {
      if (ele.ReasonCode == this.remarksCommit.value.rescode) {
        res = {
          "ReasonCode": ele.ReasonCode,
          "Reason": ele.Reason,
          "Scenarios": ele.Scenarios,
          "IsVoluntary": ele.IsVoluntary,
          "Remarks": this.remarksCommit.value.remark
        }
      }
    })
    let CANCEL_CHARGE_obj
    if (this.isCheckedArr) {
      CANCEL_CHARGE_obj = {
        "P_TYPE": "API",
        "R_TYPE": "FLIGHT",
        "R_NAME": "CANCEL",
        "R_DATA": {
          "ACTION": "CANCEL_CHARGE",
          "BOOKING_ID": this.cancelBookingId,
          "CANCEL_TYPE": "PARTIAL_CANCELLATION",
          "REASON": res,
          "SECTORS": [
            this.sec
          ],
          "TRACE_ID": ""
        },
        "AID": this.Agentid,
        "MODULE": "B2B",
        "IP": "182.73.146.154",
        "TOKEN": this.Token,
        "ENV": this.env,
        "Version": "1.0.0.0.0.0"
      }
    }
    else {
      CANCEL_CHARGE_obj =
      {
        "P_TYPE": "API",
        "R_TYPE": "FLIGHT",
        "R_NAME": "CANCEL",
        "R_DATA": {
          "ACTION": "CANCEL_CHARGE",
          "BOOKING_ID": this.cancelBookingId,
          "CANCEL_TYPE": "FULL_CANCELLATION",
          "Trace_Id": "",
          "REASON": res
        },
        "AID": this.Agentid,
        "MODULE": "B2B",
        "IP": "182.73.146.154",
        "TOKEN": this.Token,
        "ENV": this.env,
        "Version": "1.0.0.0.0.0"
      }
    }

    console.log(CANCEL_CHARGE_obj)
    this.pstService.POST('/FCancel', CANCEL_CHARGE_obj).subscribe((res) => {
      console.log(res)
      if(res?.Charges){
        this.loader = false
        alert("Reason Submitted ")
        this.showcharges = true
        this.hideconfirmbutton=true
        this.showtable = false
        this.charge=res
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
      }
      else if(res.Status=="Failed"){
        this
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
  showcharges = false
  showtable = false
  goBackcancel() {
    this.ShowCancelModel = false;
    this.showcharges = false
    this.showstatus = false
    this.showtable = false
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
        "TRACE_ID": "",
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
      else if (res.Status == 'Pending') {
        alert(" Pending" + res?.ErrorMessage)
      }
      else if (res?.R_DATA?.Charges?.IsCanceled) {
        alert("pnr cancelled succesfully")
        this.showtable = false;
        this.showcharges = false;
        this.showstatus = false;
        this.ShowModelDATA = true;
      }
      else {
        alert("pls contact the call centre")
      }
    },
      (err) => {
        console.log(err)
        this.wait = true
      })
  }





  statusof(d) {
    this.showstatus = false
    this.showstatuscharges = false
    // this.ShowCancelModel = true;
    // this.ShowModelDATA = true;


    // console.log("Pressed Confirmed Button ");

    this.cancelBookingId = d.BookingId

    var a = `https://fhapip.ksofttechnology.com/api/FReport/ADMIN?P_TYPE=API&R_TYPE=FLIGHT&R_NAME=GetCancelChargeStatus&AID=${this.Agentid}&TOKEN=${this.Token}&DATA=${d.BookingId}`
    console.log(a)
    this.pstService.GET(a).subscribe((res) => {
      console.log(res)
      this.statusresponse = res
      if (res.Charges) {
        this.showstatus = false
        this.showstatuscharges = true
        this.indexHidden = true

      }
      else {
        this.showstatus = true
        this.showstatuscharges = false
      }


      this.showtable = false
      this.ShowCancelModel = true;
      this.ShowModelDATA = false;
      // alert("The PNR has been Cancelled. " + " The refund is underprocess. " + this.CustomerAmount)
    },
      (err) => {
        console.log(err)
        this.wait = true
      })
  }


  statusof2(d) {
    // this.ShowCancelModel = true;
    // this.ShowModelDATA = true;


    // console.log("Pressed Confirmed Button ");

    this.cancelBookingId = d.BookingId

    var a = `https://fhapip.ksofttechnology.com/api/FReport/ADMIN?P_TYPE=API&R_TYPE=FLIGHT&R_NAME=GetCancelCommitStatus&AID=${this.Agentid}&TOKEN=${this.Token}&DATA=${d.BookingId}`
    console.log(a)
    this.pstService.GET(a).subscribe((res) => {
      console.log(res)
      this.statusresponse = res
      if (this.statusresponse.Status == 'PENDING') {
        alert(this.statusresponse.WarningMessage)
      }
      console.log(this.statusresponse.IsCancelled)
      if (this.statusresponse.IsCancelled) {
        alert("your ticket is cancelled")
        this.ShowCancelModel = false
        window.location.reload();
      }
      else if (this.statusresponse.IsCancelled == false) {
        alert(`Cancellation Rejected Remark-${this.statusresponse.OI.CancelRemark}`)

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
  showstatuscharges = false
  hideconfirmbutton = false

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
  isCheckedArr: boolean[] = [];

  onCheckboxChange(index: number, isChecked: boolean): void {
    console.log(`Checkbox at index ${index} is now ${isChecked ? 'checked' : 'unchecked'}`);
    console.log(this.isCheckedArr)
    this.selected_pax()
  }





  index
  selected_pax() {


    let ddate_oi = this.resultArr[this.index].OI

    let temp_ddate_arr = ddate_oi.split("|");
    
    let final_ddate = temp_ddate_arr[1].split(",")[0]

    let src_des_arr = this.resultArr[this.index].Sector.split(",")

    let paxdeatails = []
    
    this.isCheckedArr.forEach((ele, ind) => {
      if (ele == true) {
        paxdeatails.push({
          "TTL": "MR",
          "PAX_TYPE": this.resultArr[this.index].PaxName[ind].PaxType||"",
          "FNAME": this.resultArr[this.index].PaxName[ind].FName||"",
          "LNAME": this.resultArr[this.index].PaxName[ind].LName||""
        })
      }
    })
    this.sec = {
      "Src": src_des_arr[0]||"",
      "Des": src_des_arr[1]||"",
      "DDate": final_ddate||"",
      "PAX": paxdeatails||[]
    }

    console.log(this.sec)
  }

  sec:sec_data

}

interface passengers_data {
  TTL:string,
  PAX_TYPE:string,
  FNAME:string,
  LNAME:string
}
interface sec_data{
  Src:string,
  Des:string,
  DDate:string,
  PAX:passengers_data[]
}
