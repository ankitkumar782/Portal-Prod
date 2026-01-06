import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../Services/Crud_Services/post.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mannual-action-report',
  templateUrl: './mannual-action-report.page.html',
  styleUrls: ['./mannual-action-report.page.scss'],
})
export class MannualActionReportPage implements OnInit {

  // ----------------- Modal & UI Flow -----------------
  showActionModal: boolean = false;
  actionType: 'FULL' | 'PARTIAL' | 'REISSUE' | '' = '';
  modalStep: number = 1; 
  processing: boolean = false;
  selectedBooking: any = null;
  index: number = 0;

  // ----------------- Forms -----------------
  remarksCommit = new FormGroup({
    ClientRemarkCharge: new FormControl('', [Validators.required]),
    ClientRemarkCommit: new FormControl('', [Validators.required]),
    remark: new FormControl(''),
    rescode: new FormControl('', [Validators.required])
  });

  searchbydata = new FormGroup({
    Datatype: new FormControl('', [Validators.required]),
    Datavalue: new FormControl('', [Validators.required])
  });

  // ----------------- Search & Filter -----------------
  FromData: string = '';
  bookinid: string = '';
  pnr: string = '';
  fname: string = '';
  lname: string = '';
  resultArr: any[] = [];
  isCheckedArr: boolean[] = [];

  // ----------------- Token/Env -----------------
  Token: string = '';
  Agentid: string = '';
  env: string = '';

  // ----------------- Ticket/PDF/Excel -----------------
  maxDate: string = new Date().toISOString().split('T')[0];
  fileName: string = 'SearchbyReport.xlsx';
  pdfData: any;

  // ----------------- Cancel Ticket -----------------
  ShowCancelModel: boolean = false;
  ShowModelDATA: boolean = true;
  cancelBookingId: any;
  traceid: any;
  indexHidden: boolean = false;
  sec: sec_data;
  main_partial_check: boolean = false;
  partial_check: boolean = false;
  showcharges: boolean = false;
  showtable: boolean = false;
  showstatus: boolean = false;
  showstatuscharges: boolean = false;
  hideconfirmbutton: boolean = false;
  ticketConfirmation: boolean = false; // <--- Add this

  charge: any;
  Airlinecharge: any;
  KafilaCharge: any;
  CustomerAmount: any;
  airlinerefund: any;
  airlineToken: any;
  totalFare: any;
  flightcode: any;
  pnrOf: any;
  serviceCharge: any;
  refundableammo: any;

  loader: boolean = false;
  wait: boolean = true;
  button: boolean = false;

  sec_data_arr: sec_data[] = [];
  reasonarr: any[] = [];

  // ----------------- Ticket Details -----------------
  test: any;
  showticket: boolean = false;
  showbooking: boolean = true;
  seat: any[] = [];
  meal: any;
  mealamount: number = 0;

  constructor(private pstService: PostService) { }
statusof2(d: any): void {
  // your existing logic here
  this.cancelBookingId = d.BookingId;

  const url = `https://fhapip.ksofttechnology.com/api/FReport/ADMIN?P_TYPE=API&R_TYPE=FLIGHT&R_NAME=GetCancelCommitStatus&AID=${this.Agentid}&TOKEN=${this.Token}&DATA=${d.BookingId}`;
  console.log(url);

  this.pstService.GET(url).subscribe(
    (res) => {
      console.log(res);
      this.statusresponse = res;

      if (this.statusresponse.Status === 'PENDING') {
        alert(this.statusresponse.WarningMessage);
      }

      if (this.statusresponse.IsCancelled) {
        alert('Your ticket is cancelled');
        this.ShowCancelModel = false;
        window.location.reload();
      } else if (this.statusresponse.IsCancelled === false) {
        alert(`Cancellation Rejected Remark - ${this.statusresponse.OI.CancelRemark}`);
      }
    },
    (err) => {
      console.log(err);
      this.wait = true;
    }
  );
}
statusresponse
  ngOnInit() {
    this.env = sessionStorage.getItem("ENV") || '';
    this.Token = sessionStorage.getItem("Token") || '';
    this.Agentid = sessionStorage.getItem("Agentid") || '';
  }
goToCharges() {
  if (!this.actionType) {
    alert("Please select action type first!");
    return;
  }

  if (this.actionType === 'PARTIAL' && !this.isCheckedArr.some(v => v)) {
    alert("Please select at least one passenger for partial cancellation");
    return;
  }

  // Call your existing cancel charge request
  this.cancel_charge_req_function(); // This sets showcharges, loader, and charge data

  // Move modal to charges step
  this.modalStep = 3;
}

  // ----------------- Modal Functions -----------------
  openActionModal(d: any, i?: number) {
    this.selectedBooking = d;
    this.cancelBookingId = d.BookingId;
    this.index = i ?? 0;

    this.showActionModal = true;
    this.modalStep = 1;
    this.actionType = '';
    this.partial_check = false;
    this.main_partial_check = false;
    this.showcharges = false;
    this.showtable = false;
    this.showstatus = false;
    this.isCheckedArr = new Array(d.PaxName?.length || 0).fill(false);
  }

  selectAction(type: 'FULL' | 'PARTIAL' | 'REISSUE') {
    this.actionType = type;
    if (type === 'PARTIAL') this.partial_check = true;
    this.modalStep = 2;
  }

  continueAction() {
    if (!this.actionType) return alert('Please select action type');
    if (this.actionType === 'REISSUE') return alert('Reissue flow started');

    this.cancel_charge_req_function();
    this.modalStep = 3;
  }

  cancel_charge_req_function(): void {
  // mark main_partial_check if any pax is selected
  this.isCheckedArr.forEach(ele => {
    if (ele) this.main_partial_check = true;
  });

  let res: any = {};

  // prepare reason object
  this.reasonarr.forEach((ele: any) => {
    if (ele.ReasonCode == this.remarksCommit.value.rescode) {
      res = {
        ReasonCode: ele.ReasonCode,
        Reason: ele.Reason,
        Scenarios: ele.Scenarios,
        IsVoluntary: ele.IsVoluntary,
        Remarks: this.remarksCommit.value.remark
      };
    }
  });

  let CANCEL_CHARGE_obj: any;

  if (this.main_partial_check) {
    CANCEL_CHARGE_obj = {
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "CANCEL",
      "R_DATA": {
        "ACTION": "CANCEL_CHARGE",
        "BOOKING_ID": this.cancelBookingId,
        "CANCEL_TYPE": "PARTIAL_CANCELLATION",
        "REASON": res,
        "SECTORS": [this.sec],
        "TRACE_ID": ""
      },
      "AID": this.Agentid,
      "MODULE": "B2B",
      "IP": "182.73.146.154",
      "TOKEN": this.Token,
      "ENV": this.env,
      "Version": "1.0.0.0.0.0"
    };
  } else {
    CANCEL_CHARGE_obj = {
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
    };
  }

  this.pstService.POST('/FCancel', CANCEL_CHARGE_obj).subscribe((res: any) => {
    if (res?.Charges) {
      this.loader = false;
      this.showcharges = true;
      this.charge = res;
      this.Airlinecharge = res.Charges.AirlineCancellationFee;
      this.KafilaCharge = res.Charges.ServiceFee;
      this.CustomerAmount = res.Charges.RefundableAmt;
      this.airlinerefund = res.Charges.AirlineRefund;
      this.airlineToken = res.Charges.AirlineToken;
      this.totalFare = res.Charges.Fare;
      this.flightcode = res.Charges.FlightCode;
      this.pnrOf = res.Charges.Pnr;
      this.refundableammo = res.Charges.RefundableAmt;
      this.serviceCharge = res.Charges.ServiceFee;
    } else if (res.Status == "Failed") {
      alert(res.ErrorMessage);
      location.reload();
    }
  }, err => {
    console.log(err);
    this.wait = true;
  });
}

confirmCancellation(): void {
  let cancelTicket = {
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
  };

  this.pstService.POST('/FCancel', cancelTicket).subscribe((res: any) => {
    console.log(res);
    if (res.Status == 'Failed') {
      alert("Failed to cancel the pnr: " + res?.ErrorMessage);
    } else if (res.Status == 'Pending') {
      alert("Pending: " + res?.ErrorMessage);
    } else if (res?.R_DATA?.Charges?.IsCanceled) {
      alert("PNR cancelled successfully");
      this.showtable = false;
      this.showcharges = false;
      this.showstatus = false;
      this.ShowModelDATA = true;
    } else {
      alert("Please contact the call centre");
    }
  }, (err) => {
    console.log(err);
    this.wait = true;
  });
}

  commitAction() {
    this.processing = true;
    setTimeout(() => {
      this.confirmCancellation();
      this.processing = false;
      this.closeActionModal();
    }, 500);
  }

  closeActionModal() {
    this.showActionModal = false;
    this.actionType = '';
    this.modalStep = 1;
    this.processing = false;
    this.showcharges = false;
    this.showtable = false;
    this.showstatus = false;
  }

  // ----------------- Search Functions -----------------
  searchBy() {
    this.FromData = this.searchbydata.value.Datatype || '';
    this.bookinid = this.FromData === "BookingId" ? this.searchbydata.value.Datavalue : '';
    this.pnr = this.FromData === "PNR" ? this.searchbydata.value.Datavalue : '';
    this.fname = this.FromData === "FName" ? this.searchbydata.value.Datavalue : '';
    this.lname = this.FromData === "LName" ? this.searchbydata.value.Datavalue : '';

    const obj = {
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
    };

    this.pstService.POST('/FReport', obj).subscribe((res: any) => {
      this.resultArr = res || [];
      this.isCheckedArr = new Array(this.resultArr[0]?.PaxName?.length || 0).fill(false);
    }, err => console.log(err));
  }

  // ----------------- PNR Functions -----------------
  PNR(d: any) {
    const obj = {
      "P_TYPE": "API",
      "R_TYPE": "FLIGHT",
      "R_NAME": "FlightBookingResponse",
      "R_DATA": {
        "TYPE": "PNRRES",
        "BOOKING_ID": d.BookingId,
        "TRACE_ID": ""
      },
      "AID": this.Agentid,
      "MODULE": "B2B",
      "IP": "182.73.146.154",
      "TOKEN": this.Token,
      "ENV": this.env,
      "Version": "1.0.0.0.0.0"
    };

    this.pstService.POST('/FReport', obj).subscribe((result: any) => {
      this.test = result;
      this.showticket = true;
      this.showbooking = false;
      this.seat = [];
      this.mealamount = 0;

      this.test.PaxInfo?.Passengers?.forEach((ele: any) => {
        this.seat.push(ele.Seat);
        ele.Meal?.forEach((a: any) => this.mealamount += a.Price);
      });
    }, err => console.log(err));
  }

  hide() {
    this.showticket = false;
    this.showbooking = true;
  }

  // ----------------- Export Functions -----------------
  exportexcel(): void {
    const element = document.getElementById('tab6');
    if (!element) return;
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  openPDF(): void {
    const doc = new jsPDF('l', 'mm', [512, 392]);
    doc.setFontSize(5);
    doc.setTextColor(100);
    (doc as any).autoTable({
      head: [['FID', 'RID', 'Email Id', 'Booking Id', 'Amount', 'PNR', 'DEP Date', 'ETIME', 'Status', 'OI', 'IP']],
      body: this.pdfData
    });
    doc.output('dataurlnewwindow');
    doc.save('BookingReport' + this.maxDate + '.pdf');
  }

  // ----------------- Cancel Ticket Functions -----------------
  CancelTicket(d: any) {
    this.ShowCancelModel = true;
    this.ShowModelDATA = false;
    this.cancelBookingId = d.BookingId;
  }

  CancelTicket2(d: any, i: number) {
    this.ShowCancelModel = true;
    this.ShowModelDATA = false;
    this.index = i;
    this.cancelBookingId = d.BookingId;
    this.traceid = d.TransId;

    const url = `https://fhapip.ksofttechnology.com/api/FReport/ADMIN?P_TYPE=API&R_TYPE=FLIGHT&R_NAME=GetCRList&AID=${this.Agentid}&TOKEN=${this.Token}`;
    this.pstService.GET(url).subscribe((res: any) => {
      this.reasonarr = res || [];
      this.showtable = true;
    }, err => console.log(err));
  }

  // ----------------- Checkbox Functions -----------------
  onCheckboxChange(index: number, isChecked: boolean) {
    this.isCheckedArr[index] = isChecked;
    this.selected_pax();
  }

  onPartialCheckboxChange() {
    console.log(this.partial_check);
  }

  selected_pax() {
    const row = this.resultArr[this.index];
    if (!row) return alert("Invalid Selection.");

    const sector = row.Sector || '';
    const src_des_arr = sector.split(',');
    if (src_des_arr.length < 2) return alert("Unable to get the sector. Contact call center.");

    const Src = src_des_arr[0];
    const Des = src_des_arr[1];

    const OI = row.OI || '';
    let final_ddate = '';
    if (OI.includes("|")) final_ddate = OI.split("|")[1].split(",")[0];

    const paxdeatails: passengers_data[] = [];
    this.isCheckedArr.forEach((ele, ind) => {
      if (ele && row.PaxName[ind]) {
        paxdeatails.push({
          TTL: "MR",
          PAX_TYPE: row.PaxName[ind].PaxType || '',
          FNAME: row.PaxName[ind].FName || '',
          LNAME: row.PaxName[ind].LName || ''
        });
      }
    });

    this.sec = { Src, Des, DDate: final_ddate, PAX: paxdeatails };
  }

  // ----------------- Interfaces -----------------
}

interface passengers_data {
  TTL: string;
  PAX_TYPE: string;
  FNAME: string;
  LNAME: string;
}

interface sec_data {
  Src: string;
  Des: string;
  DDate: string;
  PAX: passengers_data[];
}
