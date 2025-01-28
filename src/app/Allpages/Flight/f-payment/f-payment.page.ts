import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-f-payment',
  templateUrl: './f-payment.page.html',
  styleUrls: ['./f-payment.page.scss'],
})
export class FPaymentPage implements OnInit {
  f_chk_res: any;
  slt_flt: any;
  show_fare:any;
  istax:any
  // @Input() review_Obj: any
  pnr_res_send: any
  // http://stage1.ksofttechnology.com/api/FPNR
  constructor(private route:Router) { }
  message:any
  ngOnInit() {
    this.f_chk_res = JSON.parse(localStorage.getItem('f_obj'))
    // this.f_chk_res = this.review_Obj
    console.log(this.f_chk_res.FareChkRes)
    // this.slt_flt = this.f_chk_res.selectedFlt

    this.slt_flt = this.f_chk_res.FareChkRes.SelectedFlight[0]
    this.message =this.f_chk_res

  }
  showTicket = false

  // makePNR() {

  //   this.pnr_res_send = this.f_chk_res
  //   this.showTicket = true


  // }

  makePNR(){
    this.route.navigate(['flightTicket'])
    
  }

}
