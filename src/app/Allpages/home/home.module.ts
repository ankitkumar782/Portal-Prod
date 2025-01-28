import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { FormShareModule } from '../../form-share/form-share.module';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    FormShareModule
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [HomePage]
})
export class HomePageModule {}
