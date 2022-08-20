import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewEstimate4Page } from './new-estimate4.page';

const routes: Routes = [
  {
    path: '',
    component: NewEstimate4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewEstimate4PageRoutingModule {}
