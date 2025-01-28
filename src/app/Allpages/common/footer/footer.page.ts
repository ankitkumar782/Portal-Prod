import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {

  constructor(private rout:Router) { }

  ngOnInit() {
  }
  aboutus() {
    this.rout.navigate(['/aboutus'])
      .then(() => {
        window.location.reload();
      });
    //window.location.replace('/aboutus')
  }
  contactus() {
    this.rout.navigate(['/contactus'])
     .then(() => {
      window.location.reload();
     }); 
    //window.location.replace('/contactus')
  }
  ngOnDestroy() {

  }

  addedShortly(){
    alert("Will Be Added Shortly")
  }

}
