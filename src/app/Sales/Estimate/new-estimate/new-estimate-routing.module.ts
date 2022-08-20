import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewEstimatePage } from './new-estimate.page';

const routes: Routes = [
  {
    path: '',
    component: NewEstimatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewEstimatePageRoutingModule {}
