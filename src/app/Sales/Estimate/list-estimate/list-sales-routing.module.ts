import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListEstimatePage } from './list-sales.page';

const routes: Routes = [
  {
    path: '',
    component: ListEstimatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListSalesPageRoutingModule {}
