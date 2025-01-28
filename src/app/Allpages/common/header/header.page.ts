import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../Services/Other_Services/common.service';
import { PostService } from '../../../Services/Crud_Services/post.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {

  constructor(private common_service: CommonService,private pstService: PostService) { }
  count:any
  ngOnInit() {
    let Token 
    Token = sessionStorage.getItem("Token")
    let aid =sessionStorage.getItem("Agentid")
    let obj=
    { "P_TYPE": "API",
    "R_TYPE": "FLIGHT",
    "R_NAME": "FlightAgencyBalance", 
    "AID": aid,
    "MODULE": "B2B",
    "IP": "182.73.146.154",
    "TOKEN": Token,
    "ENV": "D",
    "Version": "1.0.0.0.0.0"
   }

  this.pstService.POST("/FReport", obj).subscribe(res => {
    console.log(res)
    this.count=res[0].balance;
  })
  
  }
  Menu() {
    this.common_service.sendClickEvent();
  }
}
