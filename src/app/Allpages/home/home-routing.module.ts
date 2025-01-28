import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { PaymentComponent } from '../../components/payment/payment.component'
import { FlightSearchPopoverComponent } from '../../components/flight-search-popover/flight-search-popover.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'fsearch',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomePage,
    children: [
      // FLIGHT ROUTES
      {
        path: 'fsearch',
        loadChildren: () => import('../Flight/f-search/f-search.module').then(m => m.FSearchPageModule)
      },
      {
        path: 'fbookinghistory',
        loadChildren: () => import('../Flight/f-booking-history/f-booking-history.module').then(m => m.FBookingHistoryPageModule)
      },
      {
        path: 'fcancellationhistory',
        loadChildren: () => import('../Flight/f-cancellation-history/f-cancellation-history.module').then(m => m.FCancellationHistoryPageModule)
      },
      {
        path: 'frefundhistory',
        loadChildren: () => import('../Flight/f-refund-history/f-refund-history.module').then(m => m.FRefundHistoryPageModule)
      },
      {
        path: 'fpaymenthistory',
        loadChildren: () => import('../Flight/f-payment-history/f-payment-history.module').then(m => m.FPaymentHistoryPageModule)
      },
      {
        path: 'ftransactions',
        loadChildren: () => import('../Flight/f-transactions/f-transactions.module').then(m => m.FTransactionsPageModule)
      },
      {
        path: 'fpax',
        loadChildren: () => import('../Flight/f-pax/f-pax.module').then(m => m.FPaxPageModule)
      },
      {
        path: 'searchby',
        loadChildren: () => import('../Flight/searchby/searchby.module').then(m => m.SearchbyPageModule)
      },
      // {
      //   path: 'salereport',
      //   loadChildren: () => import('../../flight-sale-report/flight-sale-report.module').then(m => m.FlightSaleReportPageModule)
      // },
      {
        path: 'salereport',
        loadChildren: () => import('../Flight/salereport/salereport.module').then(m => m.SalereportPageModule)
      },
      {
        path: 'mannual-action-report',
        loadChildren: () => import('../Flight/mannual-action-report/mannual-action-report.module').then( m => m.MannualActionReportPageModule)
      },
      {
        path: 'mannual-reissue',
        loadChildren: () => import('../Flight/mannual-reissue/mannual-reissue.module').then( m => m.MannualReissuePageModule)
      },
      // {
      //   path: 'mannualcancel',
      //   loadChildren: () => import('../../salereport/salereport.module').then(m => m.MannualCancellationPageModule)
      // },
      {
        path: 'foneway',
        loadChildren: () => import('../Flight/f-one-way/f-one-way.module').then(m => m.FOneWayPageModule)
      },
      {
        path: 'froundtrip',
        loadChildren: () => import('../Flight/f-round-trip/f-round-trip.module').then(m => m.FRoundTripPageModule)
      },
      {
        path: 'fshowflight',
        loadChildren: () => import('../Flight/f-show-flight/f-show-flight.module').then(m => m.FShowFlightPageModule)
      },
      {
        path: 'fpayment',
        loadChildren: () => import('../Flight/f-payment/f-payment.module').then(m => m.FPaymentPageModule)
      },


     
      {
        path: 'myaccount',
        loadChildren: () => import('../my-account/my-account.module').then(m => m.MyAccountPageModule)
      },
      {
        path: 'payment',
        component: PaymentComponent
      }

    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
