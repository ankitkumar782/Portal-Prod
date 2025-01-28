import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Gaurd/auth.guard';
import { FlightTicketComponent } from './components/flight-ticket/flight-ticket.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'

  },
  {
    path:'flightTicket',
    component:FlightTicketComponent
  },
  {
    path: 'index',
    loadChildren: () => import('./Allpages/index/index.module').then(m => m.IndexPageModule)
  },

  {
    path: 'home',
    loadChildren: () => import('./Allpages/home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard]
  },
  {
    path: 'error',
    loadChildren: () => import('./Allpages/common/error/error.module').then(m => m.ErrorPageModule)
  },

  {
    path: 'header',
    loadChildren: () => import('./Allpages/common/header/header.module').then(m => m.HeaderPageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./Allpages/common/about-us/about-us.module').then(m => m.AboutUsPageModule)
  },
  {
    path: 'contactus',
    loadChildren: () => import('./Allpages/common/contact-us/contact-us.module').then(m => m.ContactUsPageModule)
  },
  {
    path: 'banner-slider',
    loadChildren: () => import('./Allpages/common/banner-slider/banner-slider.module').then(m => m.BannerSliderPageModule)
  },
  {
    path: 'login-header',
    loadChildren: () => import('./Allpages/common/login-header/login-header.module').then(m => m.LoginHeaderPageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./Allpages/common/footer/footer.module').then(m => m.FooterPageModule)
  },
  {
    path: 'paymentUpload',
    loadChildren: () => import('./Allpages/common/payment-upload/payment-upload.module').then(m => m.PaymentUploadPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./Allpages/common/registration/registration.module').then(m => m.RegistrationPageModule)
  },

  {
    path: '**',
    redirectTo: '/error'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
