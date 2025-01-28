import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginPopoverModule } from '../app/components/login-popover/login-popover.module';
import { JwPaginationModule } from 'jw-angular-pagination';
//import { PaymentModule } from './components/payment/payment.module';
import { AlertPopoverModule } from '../app/components/alert-popover/alert-popover.module'
import { MainService } from './Interceptors/main.service';
import { FlightSearchPopoverModule } from './components/flight-search-popover/flight-search-popover.module'
import { FlightTicketModule } from './components/flight-ticket/fight-ticket.module';
// import { BannerSliderPageModule } from '../app/Allpages/common/banner-slider/banner-slider.module';
// import { LoginHeaderPage } from '../Allpages/common/login-header/login-header.page';
// import { FooterPage } from '../Allpages/common/footer/footer.page';
// import { FPaymentPage } from '../Allpages/Flight/f-payment/f-payment.page'
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
    declarations: [AppComponent, ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        // PaymentModule,
        LoginPopoverModule,
        AlertPopoverModule,
        FlightSearchPopoverModule,
        FlightTicketModule,
        JwPaginationModule,
        NgxPaginationModule
       
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: MainService, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
