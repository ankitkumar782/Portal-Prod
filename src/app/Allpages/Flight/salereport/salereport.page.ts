import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../Services/Crud_Services/post.service';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-salereport',
  templateUrl: './salereport.page.html',
  styleUrls: ['./salereport.page.scss'],
})
export class SalereportPage implements OnInit {

  resultArr: any
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
  spinner = false;
  env: string;
  constructor(private pstService: PostService) { }

  ngOnInit() {
    this.env=sessionStorage.getItem("ENV")

    this.Token = sessionStorage.getItem("Token")
    this.Agentid = sessionStorage.getItem("Agentid")
    // this.apiHit()
    // this.Token = sessionStorage.getItem("Token")
  }

  apiHit() {
    let obbjj = {
      "P_TYPE": "API",
      "R_TYPE": "ROBOT",
      "R_NAME": "ProcessSaleReport",
      "R_DATA": {},
      "AID": this.Agentid,
      "MODULE": "B2B",
      "IP": "182.73.146.154",
      "TOKEN": this.Token,
      "ENV": this.env,
      "Version": "1.0.0.0.0.0"
    }
    console.log(obbjj)
    this.pstService.POST('/FReport', obbjj).subscribe((res) => {
      console.log(res)
      // this.wait = false
    },
      (err) => {
        console.log(err)
        this.wait = true
      })

    let obj =
    {
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "FlightSaleReport",
      "R_DATA": {
        "FROM_DATE": this.from + "T00:00:00.001Z",
        "TO_DATE": this.to + "T23:59:59.999Z",

      },
      "AID": this.Agentid,
      "MODULE": "B2B",
      "IP": "182.73.146.154",
      "TOKEN": this.Token,
      "ENV": this.env,
      "Version": "1.0.0.0.0.0"
    }
    console.log(obj)
    this.spinner = true;

    this.pstService.POSTDATA('/FReport', obj).subscribe((res) => {
      console.log(res)

    // this.amt = 0
    // this.pdfData = res.map(Object.values);
    // for (let x of res) {
    //   this.amt += parseInt(x.totalFare)
    // }

    if (res) {
      this.spinner = false;

    }
    this.resultArr = res
    this.wait = false
  },
      (err) => {
  console.log(err)
  this.wait = true
})
  }

fileName = 'SaleReport.xlsx';
exportexcel(): void {
  let element = document.getElementById('tab3');
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
// PNR(d: any) {
//   console.log(d)
//   let obj = {
//     "P_TYPE": "CC",
//     "R_TYPE": "FLIGHT",
//     "R_NAME": "FlightBookingResponseCC",
//     "R_DATA": {
//       "TYPE": "PNRRES",
//       "BOOKING_ID": d.BookingId,
//       "TRACE_ID": d.TransId,
//       "AGENT_ID": d.AgentId
//     },
//     "AID": this.Agentid,
//     "MODULE": "B2B",
//     "IP": "182.73.146.154",
//     "TOKEN": this.Token,
//     "ENV": "D",
//     "Version": "1.0.0.0.0.0"
//   }

//   console.log(obj);
//   this.pstService.POST('/FReport', obj).subscribe(result => {
//     console.log(result)
//     for (let i = 0; i < Math.floor(result.length / 2); i++) {
//       [result[i], result[result.length - 1 - i]] = [result[result.length - 1 - i], result[i]];
//     }
//     this.test = result
//     this.showticket = true
//     this.showbooking = false

//     this.test.FareBreakup.Journeys.forEach((ele) => {
//       ele.Segments.forEach((seg) => {
//         this.tax = seg.TaxBreakup
//         console.log(this.tax)
//         seg.TaxBreakup.forEach((TaxBreakup) => {
//           console.log(TaxBreakup)
//         })
//       })
//     })



//   }, (error) => {
//     console.log(error)
//   })
// }

showticket = false
showbooking = true
test: any
hide() {
  this.showticket = false
}


//   fileName = 'BookingReport.xlsx';
//   exportexcel(): void {
//     let element = document.getElementById('tabl');
//     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
//     const wb: XLSX.WorkBook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
//     XLSX.writeFile(wb, this.fileName);
// 1
//   }

search = []
addbutton = true
formsearcg = false
addvalue() {
  this.addbutton = false
  this.formsearcg = true
}


removevalue(i) {
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

condition() {
}
searchBy() {
  if (this.FromData == "BookingId") {
    this.bookinid = this.data
  }
  else {
    this.bookinid = ''
  }
  if (this.FromData == "Pnr") {
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

  // let obj = {



  //   "P_TYPE": "API",
  //   "R_TYPE": "FLIGHT",
  //   "R_NAME": "USearch",
  //   "R_DATA": {
  //     "FromDate": this.data + "T00:00:00.097",
  //     "ToDate": this.data + "T23:59:59.097",
  //     "Env": this.data,
  //     "Pnr": this.data,
  //     "FName": this.data,
  //     "LName": this.data,
  //     "BookingId": this.data
  //   },
  //   "AID": this.Agentid,
  //   "MODULE": "B2B",
  //   "IP": "182.73.146.154",
  //   "TOKEN": this.Token,
  //   "ENV": "D",
  //   "Version": "1.0.0.0.0.0"
  // }

  let obj = {
    "P_TYPE": "API",
    "R_TYPE": "FLIGHT",
    "R_NAME": "USearch",
    "R_DATA": {
      "FromDate": this.fromDate + "T00:00:00.001Z",
      "ToDate": this.toDate + "T23:59:59.999Z",
      "Env": 'P',
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
    // console.log(res.)
    this.resultArr = res
    this.resultArr.forEach(ele => {
      //  console.log(ele.Pnr)        
    });
    // console.log(this.resultArr.Pnr)
    //  this.StatusKey= this.pnr

  },
    (err) => {
      console.log(err)
    })
}


}
