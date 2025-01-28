import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  Agency=true
  Profile=false
  Document=false
  Credentials=false
  Sms=false
  Markup=false
  Upload=false

  agcy(){
    this.Agency=true
    this.Profile=false
    this.Document=false
    this.Credentials=false
    this.Sms=false
    this.Markup=false
    this.Upload=false
  }
  pfl(){
    this.Agency=false
    this.Profile=true
    this.Document=false
    this.Credentials=false
    this.Sms=false
    this.Markup=false
    this.Upload=false
  }
  doc(){
    this.Agency=false
    this.Profile=false
    this.Document=true
    this.Credentials=false
    this.Sms=false
    this.Markup=false
    this.Upload=false
  }
  creds(){
    this.Agency=false
    this.Profile=false
    this.Document=false
    this.Credentials=true
    this.Sms=false
    this.Markup=false
    this.Upload=false
  }
  sms(){
    this.Agency=false
    this.Profile=false
    this.Document=false
    this.Credentials=false
    this.Sms=true
    this.Markup=false
    this.Upload=false
  }
  mrkp(){
    this.Agency=false
    this.Profile=false
    this.Document=false
    this.Credentials=false
    this.Sms=false
    this.Markup=true
    this.Upload=false
  }
  upld(){
    this.Agency=false
    this.Profile=false
    this.Document=false
    this.Credentials=false
    this.Sms=false
    this.Markup=false
    this.Upload=true
  }
}
