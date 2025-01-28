import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MannualReissuePageRoutingModule } from './mannual-reissue-routing.module';
// import { FormShareModule } from '../../../form-share/form-share.module';
import { MannualReissuePage } from './mannual-reissue.page';
import { FormShareModule } from '../../../form-share/form-share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormShareModule,

    MannualReissuePageRoutingModule
  ],
  declarations: [MannualReissuePage]
})
export class MannualReissuePageModule {}
