import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/Services/Crud_Services/post.service';

@Component({
  selector: 'app-f-refund-history',
  templateUrl: './f-refund-history.page.html',
  styleUrls: ['./f-refund-history.page.scss'],
})
export class FRefundHistoryPage implements OnInit {
  Bookingid
  constructor(private pstService: PostService) { }
  response
  show
  search(){
    let a=`https://fhapip.ksofttechnology.com/api/FReport/ADMIN?P_TYPE=API&R_TYPE=FLIGHT&R_NAME=GetCancelCommitStatus&AID=${this.Agentid}&TOKEN=${this.Token}&DATA=${this.Bookingid}`

    this.pstService.GET(a).subscribe((res) => {
      console.log(res)
      this.response=res
      
      this.show=true


    
      // alert("The PNR has been Cancelled. " + " The refund is underprocess. " + this.CustomerAmount)
    },
      (err) => {
        console.log(err)
       
      })
  }
  ngOnInit() {
    console.log("f-refund")
    this.env = sessionStorage.getItem("ENV")
    this.Token = sessionStorage.getItem("Token")
    this.Agentid = sessionStorage.getItem("Agentid")
    
  }
  env
  Token
  Agentid

}
