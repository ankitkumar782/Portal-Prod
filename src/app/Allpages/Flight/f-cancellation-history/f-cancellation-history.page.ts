import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../Services/Crud_Services/post.service';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-f-cancellation-history',
  templateUrl: './f-cancellation-history.page.html',
  styleUrls: ['./f-cancellation-history.page.scss'],
})
export class FCancellationHistoryPage implements OnInit {
  Token
  Agentid
  showticket
  showbooking

  maxDate = new Date(new Date().getTime()).toISOString().split('T')[0];
  amt: number = 0;
  pdfData: any;
  from = this.maxDate
  to = this.maxDate
  env: string;
  constructor(private pstService: PostService) { }
  // test:boolean=false
  ngOnInit() {
    this.env=sessionStorage.getItem("ENV")
    this.Token = sessionStorage.getItem("Token")
    this.Agentid = sessionStorage.getItem("Agentid")
    // console.log(this.test)
  }
  array = [
    { "PG_PERCENT": true, "PG_VALUE": 10 },
    { "PG_PERCENT": true, "PG_VALUE": 11 },
    { "PG_PERCENT": false, "PG_VALUE": 12 }
  ]
  state(c: any) {
    console.log(c)
  }
  resultArr
  apiHit() {
    let obj = {
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "FlightCancelHistory",
      "R_DATA": {
        "FROM_DATE": this.fromDate + "T00:00:00.001Z",
        "TO_DATE": this.toDate + "T23:59:59.999Z",
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
      this.amt = 0
      this.pdfData = res.map(Object.values);
      for (let x of res) {
        this.amt += parseInt(x.totalFare)
      }
      this.resultArr = res

    },
      (err) => {
        console.log(err)

      })
  }

  test
  tax
  PNR(d: any) {
    console.log(d)
    let obj = {
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "FlightBookingResponseCC",
      "R_DATA": {
        "TYPE": "PNRRES",
        "BOOKING_ID": d.BookingId,
        "TRACE_ID": "",
        "AGENT_ID": d.AgentId
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



    }, (error) => {
      console.log(error)
    })
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
  fileName = 'CancelReport.xlsx';
  exportexcel(): void {
    let element = document.getElementById('tab2');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
  hide() {
    this.showticket = false
  }
  data
  fromDate
  toDate
  FromData = ""
  filter() {
    // let obj = {
    //   "P_TYPE": "API",
    //   "R_TYPE": "FLIGHT",
    //   "R_NAME": "FlightCancelHistory",
    //   "R_DATA": {
    //     "ACTION": this.FromData,
    //     "FROM_DATE": this.from + "T00:00:00.097",
    //     "TO_DATE": this.to + "T23:59:59.097",

    //   },
    //   "AID": this.Agentid,
    //   "MODULE": "B2B",
    //   "IP": "182.73.146.154",
    //   "TOKEN": this.Token,
    //   "ENV": this.env,
    //   "Version": "1.0.0.0.0.0"
    // }

    let obj = {
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "FlightCancelHistory",
      "R_DATA": {
        "ACTION": this.FromData,
        "FROM_DATE": this.fromDate +  "T00:00:00.001Z",
        "TO_DATE": this.toDate + "T23:59:59.999Z",
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
      this.amt = 0
      this.pdfData = res.map(Object.values);
      for (let x of res) {
        this.amt += parseInt(x.totalFare)
      }
      this.resultArr = res

    },
      (err) => {
        console.log(err)

      })
  }

}
