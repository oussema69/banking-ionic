import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientPaymentsPage } from './client-payments.page';

const routes: Routes = [
  {
    path: '',
    component: ClientPaymentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientPaymentsPageRoutingModule {}
