import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderPageRoutingModule } from './header-routing.module';
import { HeaderPage } from './header.page';
import { FormShareModule } from '../../../form-share/form-share.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HeaderPageRoutingModule,
    FormShareModule,
   
  ],
  declarations: [HeaderPage]
})
export class HeaderPageModule {}
