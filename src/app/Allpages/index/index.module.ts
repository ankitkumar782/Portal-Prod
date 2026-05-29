import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IndexPageRoutingModule } from './index-routing.module';
import { IndexPage } from './index.page';
import { CdkOverlayOrigin } from "@angular/cdk/overlay";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexPageRoutingModule,
    CdkOverlayOrigin
],
  declarations: [IndexPage]
})
export class IndexPageModule {
}
