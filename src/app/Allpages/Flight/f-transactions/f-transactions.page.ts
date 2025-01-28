import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../../../Services/Crud_Services/post.service'
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-f-transactions',
  templateUrl: './f-transactions.page.html',
  styleUrls: ['./f-transactions.page.scss'],
})
export class FTransactionsPage implements OnInit {
  Token
  Agentid
  env: string;
  constructor(private pstService: PostService) { }
  results: any;
  myValueSub: Subscription;
  maxDate = new Date(new Date().getTime()).toISOString().split('T')[0];
  from = this.maxDate
  to = this.maxDate
  apiHit(){
    let data={
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "FlightAgencyStatement",
      "R_DATA": {
      "FROM_DATE": this.from + "T00:00:00.001Z",
      "TO_DATE": this.to + "T23:59:59.999Z",
      "AGENT_ID": this.Agentid
      },
      "AID": this.Agentid,
      "MODULE": "B2B",
      "IP": "182.73.146.154",
      "TOKEN": this.Token,
      "ENV": this.env,
      "Version": "1.0.0.0.0.0"
     }
     let d = JSON.stringify(data)
     sessionStorage.setItem('req',d)
     console.log(data);
    this.pstService.POST('/FReport',data).subscribe(result => {
     
      console.log(result)
      this.test=result

     
    }, (error) => {
      console.log(error)
    })
  }
  test
  fileName = 'TransactionReport.xlsx';
  exportexcel(): void {
    let element = document.getElementById('tab5');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
  
  ngOnInit() {
    this.Token = sessionStorage.getItem("Token")
    this.Agentid = sessionStorage.getItem("Agentid")
    this.env=sessionStorage.getItem("ENV")
  }
  ngOnDestroy() {
  
  }

//   {
//     "P_TYPE": "API",
//     "R_TYPE": "FLIGHT",
//     "R_NAME": "FlightAgencyStatement",
//     "R_DATA": {
//        "FROM_DATE": "2023-01-25T00:00:00.097",
//        "TO_DATE": "2023-01-31T10:20:40.097"
//     },
//     "AID": "18785869",
//     "MODULE": "B2B",
//     "IP": "182.73.146.154",
//     "TOKEN": "c18b08e24363f1fb12960e44db5ceeed",
//     "ENV": this.env,
//     "Version": "1.0.0.0.0.0"
//  }





PNR(d: any) {
  console.log(d)
  let obj = {
    "P_TYPE": "CC",
    "R_TYPE": "FLIGHT",
    "R_NAME": "FlightBookingResponseCC",
    "R_DATA": {
      "TYPE": "PNRRES",
      "BOOKING_ID": d.AliasId,
      "TRACE_ID":d.TransId,
      "AGENT_ID": d.Agentid
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

showbooking=true
showticket=false
tax
 
hide() {
  this.showticket = false
  this.showbooking=true
  this.apiHit()
}
}
