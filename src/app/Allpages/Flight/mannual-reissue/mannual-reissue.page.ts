import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { PostService } from 'src/app/Services/Crud_Services/post.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mannual-reissue',
  templateUrl: './mannual-reissue.page.html',
  styleUrls: ['./mannual-reissue.page.scss'],
})
export class MannualReissuePage implements OnInit {

  maxDate = new Date(new Date().getTime()).toISOString().split('T')[0];
  amt: number = 0;
  pdfData: any;
  FromData = ""
  data = ""
  bookinid
  pnr
  fname
  lname
  result
  response = false

  FromData2 = ''
  toDate
  fromDate
  
  Token
  Agentid
  resultArr
  tax
  env: string;

  constructor(private pstService: PostService) { }
  
  ngOnInit() {
    this.env=sessionStorage.getItem("ENV")

    this.Token = sessionStorage.getItem("Token")
    this.Agentid = sessionStorage.getItem("Agentid")
  }


  CustmrDetails = new FormGroup({
    Name: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    Remark: new FormControl('', Validators.required)
  });


  onSubmit() {
    let obj = {
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "FManualAction",
      "R_DATA": {
        "ActionType": this.FromData2,
        "BookingId": this.bookId,
        "Pnr": this.CustmrDetails.value.Email,
        "Requested_By": this.CustmrDetails.value.Name,
        "Remark": this.CustmrDetails.value.Remark
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
      this.result = res
      if (this.result.Status == "success") {
        this.response = true
        this.actiondiv = false
      }

    },
      (err) => {
        console.log(err)
      })
  }

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
        "Env": this.env,
        "Pnr": this.pnr,
        "FName": this.fname,
        "LName": this.lname,
        "BookingId": this.bookinid

      },
      "AID": this.Agentid,
      "MODULE": "B2B",
      "IP": "182.73.146.154",
      "TOKEN":  this.Token,
      "ENV": this.env,
      "Version": "1.0.0.0.0.0"
    }
    console.log(obj)
    this.pstService.POST('/FReport', obj).subscribe((res) => {
      console.log(res)
      this.resultArr = res

    },
      (err) => {
        console.log(err)
      })
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
        "TRACE_ID":"",
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

  showticket = false
  showbooking = true
  test: any

  hide() {
    this.showticket = false
    this.showbooking = true
  }
  fileName = 'ManualReport.xlsx';

  exportexcel(): void {
    let element = document.getElementById('tab4');
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
  actiondiv = false
  bookId

  action(d, i) {
    console.log(i)
    console.log(d)
    this.bookId = d.BookingId
    this.actiondiv = true

    let obj = {
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "ActionTypeRetrive",
      "R_DATA": {

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
      this.actiontype = res

    },
      (err) => {
        console.log(err)
      })
  }
  actiontype
  close() {

    this.actiondiv = false
    this.response = false
  }
  close2() {

    this.response = false
  }
  showissueform = false
  showcancellation = false
  showssr = false
  reissue() {
    this.showissueform = true
    this.showcancellation = false
    this.showssr = false
  }
  Cancellation() {
    this.showcancellation = true
    this.showissueform = false
    this.showssr = false
  }
  SSr() {
    this.showissueform = false
    this.showcancellation = false
    this.showssr = true
  }
  manualactionretrive() {
    let obj = {
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "FManualActionRetrieve",
      "R_DATA": {
        "Action": this.FromData2
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


    },
      (err) => {
        console.log(err)
      })
  }
}
