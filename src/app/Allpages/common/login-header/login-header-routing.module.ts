import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginHeaderPage } from './login-header.page';

const routes: Routes = [
  {
    path: '',
    component: LoginHeaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginHeaderPageRoutingModule {}
