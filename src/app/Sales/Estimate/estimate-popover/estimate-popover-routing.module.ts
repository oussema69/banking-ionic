import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstimatePopoverPage } from './estimate-popover.page';

const routes: Routes = [
  {
    path: '',
    component: EstimatePopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstimatePopoverPageRoutingModule {}
