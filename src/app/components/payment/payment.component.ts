import { Component, Input, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { CommonService } from '../../Services/Other_Services/common.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  @Input() Data;

  constructor(private cm_srvice: CommonService) { }
  PG_CTRL: any; //checkbox
  AGENT_BALANCE:any
  default_pg = "paytm";
  PG: any[] = [
    {
      "name": "paytm", "status": true, "item":
        [
          { "iname": "CC", "active": true, "percent": true, "value": "2" },
          { "iname": "DC", "active": true, "percent": true, "value": "1" },
          { "iname": "NB", "active": true, "percent": false, "value": "150" },
          { "iname": "UPI", "active": true, "percent": true, "value": "3" },
          { "iname": "CASH", "active": true, "percent": true, "value": "8" }
        ]
    },
    {
      "name": "payu", "status": true, "item":
        [
          { "iname": "CC", "active": true, "percent": true, "value": "0.5" },
          { "iname": "DC", "active": true, "percent": true, "value": "0.5" },
          { "iname": "NB", "active": true, "percent": true, "value": "0.5" },
          { "iname": "UPI", "active": true, "percent": true, "value": "0.5" },
          { "iname": "CASH", "active": false, "percent": true, "value": "0.5" }
        ]
    },
    {
      "name": "paymate", "status": true, "item":
        [
          { "iname": "CC", "active": true, "percent": true, "value": "0.5" },
          { "iname": "DC", "active": true, "percent": true, "value": "0.5" },
          { "iname": "NB", "active": true, "percent": true, "value": "0.5" },
          { "iname": "UPI", "active": true, "percent": true, "value": "0.5" },
          { "iname": "CASH", "active": true, "percent": true, "value": "0.5" }
        ]
    },
    {
      "name": "hdfc", "status": true, "item":
        [
          { "iname": "CC", "active": true, "percent": true, "value": "0.5" },
          { "iname": "DC", "active": true, "percent": true, "value": "0.5" },
          { "iname": "NB", "active": true, "percent": true, "value": "0.5" },
          { "iname": "UPI", "active": true, "percent": true, "value": "0.5" },
          { "iname": "CASH", "active": true, "percent": true, "value": "0.5" }
        ]
    }
  ];
  OO = {
    PG_NAME: "",
    PG_COMP: "",
    PG_PERCENT: "",
    PG_VALUE: "",
    PG_CHARGE: 0,
    AMOUNT_PG: 0,
    AMOUNT_WALLET: 0,
    NET: 0
  };
  itemArr: any[];

  pg_name
  selected: String

  conf = false; //cross-logo
  CD: any;
  chkBox: any;
  input_amount = 0;
  AMOUNT_PG = 0;
  AMOUNT_WALLET = 0
  ticketAmount=0
  ngOnInit() {
    this.cm_srvice.count.subscribe(c => {
      this.AGENT_BALANCE = c;
    });
    this.ticketAmount=this.Data.FareChkRes.FareBreakup.NewFare
    this.SetDefaultCtrl();

  }

  SetDefaultCtrl() {
    if (this.AgencyBalanceStatus()) {
      this.PG_CTRL = false;
      this.conf = true;
      this.chkBox = true;
      this.AMOUNT_WALLET = this.ticketAmount;
    }
    else {
      this.chkBox = true;
      this.PG_CTRL = true;
      this.conf = false;
      this.AMOUNT_WALLET = this.AGENT_BALANCE;
      this.AMOUNT_PG = this.ticketAmount - this.AGENT_BALANCE;
    }
  }

  AgencyBalanceStatus() {
    return this.ticketAmount > this.AGENT_BALANCE ? false : true;
  }


  optionControler(x: string) {
    console.log(x)
    for (let i = 0; i < this.PG.length; i++) {
      if (x == this.PG[i]["name"]) {
        this.pg_name = this.PG[i]["name"];
        this.itemArr = this.PG[i]["item"].filter((e) => {

          return e.active == true
        }
        )
        console.log(this.pg_name, this.itemArr)
      }
      else {
        this.PG[i]["value"] = false;
      }
    }
    this.conf = false;
  }

  get_calculation(event) {
    // console.log(event)
    var PGC = 0;
    var NET = 0;
    var dt = event.value.split(",");
    if (this.AgencyBalanceStatus() == true) {
      this.AMOUNT_PG = this.ticketAmount;
      this.AMOUNT_WALLET = 0;
    }
    if (dt[2] === 'true') {
      PGC = (this.AMOUNT_PG * (dt[3] / 100));
      NET = parseInt(this.AMOUNT_PG.toString()) + (this.AMOUNT_PG * (dt[3] / 100));
    }
    else {
      PGC = dt[3];
      NET = parseInt(this.AMOUNT_PG.toString()) + parseInt(PGC.toString());
    }
    this.OO.PG_NAME = dt[0];
    this.OO.PG_COMP = dt[1];
    this.OO.PG_PERCENT = dt[2];
    this.OO.PG_VALUE = dt[3];
    this.OO.PG_CHARGE = PGC;
    this.OO.AMOUNT_PG = this.AMOUNT_PG;
    this.OO.AMOUNT_WALLET = this.AMOUNT_WALLET;
    this.OO.NET = NET;
    this.CD = this.OO;
    this.conf = true;

  }


  ToggelChkbox(event: any) {
    // console.log(event.target.checked)

    if (event.target.checked === true) {
      if (this.WalletPGConditon()) {
        this.ChkboxChecked();
      }
    }
    else {
      if (this.WalletPGConditon()) {
        this.ChkboxUNChecked();
      }
    }
  }



  FilloutputDataForWallet() {
    this.chkBox = true;
    this.conf = true;
    this.PG_CTRL = false;
    this.OO.PG_NAME = "";
    this.OO.PG_COMP = "";
    this.OO.PG_PERCENT = "0";
    this.OO.PG_VALUE = "0";
    this.OO.PG_CHARGE = 0;
    this.OO.AMOUNT_PG = 0;
    this.OO.AMOUNT_WALLET = this.ticketAmount;
    this.OO.NET = this.ticketAmount;
    this.AMOUNT_WALLET = this.ticketAmount;
    this.CD = this.OO;
  }

  ChkboxChecked() {
    this.conf = true;
    this.PG_CTRL = false;
    this.AMOUNT_WALLET=this.ticketAmount
    this.CD=""
  }

  ChkboxUNChecked() {
    this.conf = false;
    this.PG_CTRL = true;
    let ev = { value: "" }
    ev.value = "paytm,CC,true,2"
    this.get_calculation(ev)
    this.pg_name = "paytm";
    this.selected = "paytm,CC,true,2"
    this.itemArr = [{ "iname": "CC", "active": true, "percent": true, "value": "2" },
    { "iname": "DC", "active": true, "percent": true, "value": "1" },
    { "iname": "NB", "active": true, "percent": false, "value": "150" },
    { "iname": "UPI", "active": true, "percent": true, "value": "3" },
    { "iname": "CASH", "active": true, "percent": true, "value": "8" }];
  }

  WalletPGConditon() {
    if (this.AgencyBalanceStatus()) {
      return true;
    }
    else {
      return false;
    }

  }



  onConfirm() {

    if (this.CD) {
      
    }
    else {
    
      // console.log(this.ticketAmount);
      let amount = this.ticketAmount
      this.cm_srvice.nextCount(amount)
    }

  }

}