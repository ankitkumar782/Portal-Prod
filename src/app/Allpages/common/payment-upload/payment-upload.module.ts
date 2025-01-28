import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaymentUploadPageRoutingModule } from './payment-upload-routing.module';
import { PaymentUploadPage } from './payment-upload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentUploadPageRoutingModule,
  
  ],
  declarations: [PaymentUploadPage]
})
export class PaymentUploadPageModule {}
