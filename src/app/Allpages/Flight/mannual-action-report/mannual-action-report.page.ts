import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../Services/Crud_Services/post.service';

@Component({
  selector: 'app-mannual-action-report',
  templateUrl: './mannual-action-report.page.html',
  styleUrls: ['./mannual-action-report.page.scss'],
})
export class MannualActionReportPage implements OnInit {

  resultArr: any
  FromData2=''
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
  id
  env: string;

  constructor(private pstService: PostService,private route: ActivatedRoute) { }
  ngOnInit() {
    this.env=sessionStorage.getItem("ENV")

    this.Token = sessionStorage.getItem("Token")
    this.Agentid = sessionStorage.getItem("Agentid")
    // this.apiHit()
    // this.route.paramMap.subscribe(params => {
    //   this.id = params.get('id');
    //   // Do more processing here if needed
    // });
  
    // window.location.reload();
  }

  CancelTicket(d: any) {
    this.ShowCancelModel = true;
    this.ShowModelDATA = false;
    this.cancelBookingId = d.BookingId
    let cance =
    {
      // "P_TYPE": "API",
      // "R_TYPE": "FLIGHT",
      // "R_NAME": "CANCEL",
      // "R_DATA": {
      //   "ACTION": "CANCEL_CHARGE",
      //   "BOOKING_ID": this.cancelBookingId,
      //   "CANCEL_TYPE": "FULL_CANCELLATION",
      //   "Trace_Id": ""
      // },
      // "AID": this.Agentid,
      // "MODULE": "B2B",
      // "IP": "182.73.146.154",
      // "TOKEN": this.Token,
      // "ENV": this.env,
      // "Version": "1.0.0.0.0.0"
    }
    console.log(cance);
    this.pstService.POST('/FCancel', cance).subscribe((res) => {
      console.log(res)
      this.charge = res;
      
      this.Airlinecharge = res.Charges.AirlineCancellationFee;
      this.KafilaCharge = res.Charges.ServiceFee;
      this.CustomerAmount = res.Charges.RefundableAmt;
      this.airlinerefund = res.Charges.AirlineRefund;
      this.airlineToken = res.Charges.AirlineToken;
      console.log(res.Charges.Fare)
      this.totalFare = res.Charges.Fare
      console.log(res.Charges.FlightCode)
      this.flightcode = res.Charges.FlightCode;
      console.log(res.Charges.IsError)
      this.pnrOf = res.Charges.Pnr;
      console.log(res.Charges.Pnr)
      this.refundableammo = res.Charges.RefundableAmt;
      console.log(res.Charges.RefundableAmt)
      this.serviceCharge = res.Charges.ServiceFee;
      console.log(res.Charges.ServiceFee)
    },
      (err) => {
        console.log(err)
        this.wait = true
      })

  }


  CancelTicket2(d: any) {
    this.ShowCancelModel = true;
    this.ShowModelDATA = false;
    this.cancelBookingId = d.BookingId
    let cance =
    {
      // "P_TYPE": "API",
      // "R_TYPE": "FLIGHT",
      // "R_NAME": "CANCEL",
      // "R_DATA": {
      //   "ACTION": "CANCEL_CHARGE",
      //   "BOOKING_ID": this.cancelBookingId,
      //   "CANCEL_TYPE": "FULL_CANCELLATION",
      //   "Trace_Id": d.TransId
      // },
      // "AID": this.Agentid,
      // "MODULE": "B2B",
      // "IP": "182.73.146.154",
      // "TOKEN": this.Token,
      // "ENV": this.env,
      // "Version": "1.0.0.0.0.0"
    }
    console.log(cance);
    this.pstService.POST('/FCancel', cance).subscribe((res) => {
      console.log(res)

      this.charge = res;
      this.Airlinecharge = res.Charges.AirlineCancellationFee;
      this.KafilaCharge = res.Charges.ServiceFee;
      this.CustomerAmount = res.Charges.RefundableAmt;
      this.airlinerefund = res.Charges.AirlineRefund;
      this.airlineToken = res.Charges.AirlineToken;
      console.log(res.Charges.Fare)
      this.totalFare = res.Charges.Fare
      console.log(res.Charges.FlightCode)
      this.flightcode = res.Charges.FlightCode;
      console.log(res.Charges.IsError)
      this.pnrOf = res.Charges.Pnr;
      console.log(res.Charges.Pnr)
      this.refundableammo = res.Charges.RefundableAmt;
      console.log(res.Charges.RefundableAmt)
      this.serviceCharge = res.Charges.ServiceFee;
      console.log(res.Charges.ServiceFee)
    },
      (err) => {
        console.log(err)
        this.wait = true
      })

  }
  goBackcancel() {
    this.ShowCancelModel = false;
    this.ShowModelDATA = true;
  }

  confirmCancellation() {
    this.ShowCancelModel = false;
    this.ShowModelDATA = true;
    this.ticket = !this.ticket;

    if (this.ticket == true) {
      this.ticket = !this.ticket;
      this.ticketConfirmation = true

      this.resultArr.forEach((value: any, index: any) => {
        if (value.bookingId == this.cancelBookingId) {
          this.resultArr.splice(index, 1)
        }
      })

      let cancelTicket =
      {
      //   "P_TYPE": "API",
      //   "R_TYPE": "FLIGHT",
      //   "R_NAME": "CANCEL",
      //   "R_DATA": {
      //     "ACTION": "CANCEL_COMMIT",
      //     "BOOKING_ID": this.cancelBookingId,
      //     "CANCEL_TYPE": "FULL_CANCELLATION",
      //     "TRACE_ID": "",
      //     // "Charges": this.charge.Charges
      //     "Charges": {
      //       "FlightCode": this.flightcode,
      //       "Pnr": this.pnrOf,
      //       "SplitedPnr": null,
      //       "Fare": this.totalFare,
      //       "AirlineCancellationFee": this.Airlinecharge,
      //       "AirlineRefund": this.airlinerefund,
      //       "ServiceFee": this.serviceCharge,
      //       "RefundableAmt": this.refundableammo,
      //       "IsCanceled": this.ticketConfirmation,
      //       "IsError": false,
      //       "Description": null,
      //       "AirlineToken": this.airlineToken
      //     }
      //   },
      //   "AID": this.Agentid,
      //   "MODULE": "B2B",
      //   "IP": "182.73.146.154",
      //   "TOKEN": this.Token,
      //   "ENV": this.env,
      //   "Version": "1.0.0.0.0.0"
      }
      console.log(cancelTicket)
      this.pstService.POST('/FCancel', cancelTicket).subscribe((res) => {
        console.log(res)
      },
        (err) => {
          console.log(err)
          this.wait = true
        })
    }
    alert("The PNR has been Cancelled. " + " The refund is underprocess. " + this.CustomerAmount)
  }
  fcode=''
  status=''

  apiHit() {
    let obj = {
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "FManualActionRetrieve",
      "R_DATA": {
        "FROM_DATE": this.from + "T00:00:00.001Z",
        "TO_DATE": this.to + "T23:59:59.999Z",
        "ACTION": ""
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
      // this.amt = 0
      // this.pdfData = res.map(Object.values);
      // for (let x of res) {
      //   this.amt += parseInt(x.totalFare)
      // }
      this.resultArr = res
      // this.wait = false
    },
      (err) => {
        console.log(err)
        // this.wait = true
      })
  }

  fileName = 'BookingReport.xlsx';

  exportexcel() {
    // let element = document.getElementById('tabl');
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // XLSX.writeFile(wb, this.fileName);
  }

  // openPDF(): void {
  //   var doc = new jsPDF('l', 'mm', [512, 392]);
  //   doc.setFontSize(5);
  //   doc.setTextColor(100);
  //   (doc as any).autoTable({
  //     head: [['FID', 'RID', 'Email Id', 'Booking Id', 'Amount', 'PNR', 'DEP Date', 'ETIME', 'Status', 'OI', 'IP']],
  //     body: this.pdfData,
  //   })
  //   doc.output('dataurlnewwindow')
  //   doc.save('BookingReport' + this.maxDate + '.pdf');
  // }

  PNR(d: any) {
    console.log(d)
    let obj = {
      // "P_TYPE": "CC",
      // "R_TYPE": "FLIGHT",
      // "R_NAME": "FlightBookingResponseCC",
      // "R_DATA": {
      //   "TYPE": "PNRRES",
      //   "BOOKING_ID": d.BookingId,
      //   "TRACE_ID":d.TransId,
      //   "AGENT_ID": d.AgentId
      // },
      // "AID": this.Agentid,
      // "MODULE": "B2B",
      // "IP": "182.73.146.154",
      // "TOKEN": this.Token,
      // "ENV": this.env,
      // "Version": "1.0.0.0.0.0"
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
    this.showbooking=true
  }

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
      // "P_TYPE": "API",
      // "R_TYPE": "FLIGHT",
      // "R_NAME": "USearch",
      // "R_DATA": {
      //   "FromDate": "",
      //   "ToDate": "",
      //   "Env": this.env,
      //   "Pnr": this.pnr,
      //   "FName": this.fname,
      //   "LName": this.lname,
      //   "BookingId": this.bookinid

      // },
      // "AID": this.Agentid,
      // "MODULE": "B2B",
      // "IP": "182.73.146.154",
      // "TOKEN":  this.Token,
      // "ENV": this.env,
      // "Version": "1.0.0.0.0.0"
    }
    console.log(obj)
    this.pstService.POST('/FReport', obj).subscribe((res) => {
      console.log(res)
      this.resultArr = res
      this.resultArr.forEach(ele => { 
      });

    },
      (err) => {
        console.log(err)
      })
  }

}
