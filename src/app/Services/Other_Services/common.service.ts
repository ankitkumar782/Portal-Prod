import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { PostService } from '../Crud_Services/post.service';
@Injectable({
  providedIn: 'root'
})
export class CommonService {


  counter: any
  count: BehaviorSubject<number>;

  constructor(private pstService: PostService) {
    this.count = new BehaviorSubject(this.counter);
    this.m_Token = new BehaviorSubject(this.token)
    // this.getBal()
  }
  nextCount(amount: number) {
    // let x = this.counter - amount
    // this.counter = x
    // if (x > 0) {
    //   this.count.next(x);
    // }
    // else {
    //   alert("Balance Low !!")
    // }
    // this.getBal()
  }

   getBal() {
    let Token 
    Token = sessionStorage.getItem("Token")
    let x = 100
    // let obj = {
    //   "P_TYPE": "CC",
    //   "R_TYPE": "FLIGHT",
    //   "R_NAME": "FlightAgencyBalanceRetriveCC",
    //   "R_DATA": {
    //     "AGENT_ID": "27286260"
    //   },
    //   "AID": "",
    //   "MODULE": "B2B",
    //   "IP": "182.73.146.154",
    //   "TOKEN": "34ab0c05ccf0f194fe65e8b654272e84",
    //   "ENV": "D",
    //   "Version": "1.0.0.0.0.0"
    // }



  }


  // TOKEN
  token = ""
  m_Token: BehaviorSubject<string>
  updateToken(tkn: string) {
    this.m_Token.next(tkn)
  }




  // SIDE MENU OPEN CLOSE BUTTON
  private subject = new Subject<void>();
  sendClickEvent() {
    this.subject.next();
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }




}
