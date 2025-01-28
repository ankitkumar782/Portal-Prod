import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../Services/Crud_Services/post.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-flight-ticket',
  templateUrl: './flight-ticket.component.html',
  styleUrls: ['./flight-ticket.component.scss'],
})
export class FlightTicketComponent implements OnInit {
  confirm = true
  constructor(private post_service: PostService, private route: Router) { }
  // @Input() finalPnrObj
  pnrResponse: any
  pnrGenerated = false
  spinner = true
  error = false
  f: any
  seat
  meal
  seatamount
  mealamount
  ngOnInit() {
    let finalPnrObj = JSON.parse(localStorage.getItem('f_obj'))
    this.post_service.POST("/FPNR", finalPnrObj).subscribe((res) => {
      console.log(res)
      this.f = res
      if (res.BookingInfo.BookingStatus === "CONFIRMED") {
        this.f = res
        this.pnrGenerated = true
        this.spinner = false
        this.error = true

        this.f.PaxInfo.Passengers.forEach((ele) => {
          this.seat = ele
          this.seat.Seat?.forEach((a) => {
            this.seatamount += a.Price
            console.log(a.Price)
          })
    
        })
    
        this.f.PaxInfo.Passengers?.forEach((ele) => {
          this.meal = ele
          this.meal.Meal?.forEach((a) => {
            this.mealamount += a.Price
            console.log(a.Price)
          })
    
        })

      }
      if (res.BookingInfo.BookingStatus === "FAILED") {
        this.pnrGenerated = false
        this.error = true
        this.spinner = false

      }
    }, err => {
      this.pnrGenerated = false
      this.error = true
      this.spinner = false
    })
  }
  close() {
    this.route.navigate(['home/fsearch']).then(() => {
      // window.print();
      window.location.reload();
      localStorage.clear()
    });
  }

  Print() {
    window.print();
  }
}
