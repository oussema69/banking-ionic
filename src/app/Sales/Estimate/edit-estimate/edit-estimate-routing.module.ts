import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditEstimatePage } from './edit-estimate.page';

const routes: Routes = [
  {
    path: '',
    component: EditEstimatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditEstimatePageRoutingModule {}
