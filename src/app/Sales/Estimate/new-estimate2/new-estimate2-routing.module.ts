import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewEstimate2Page } from './new-estimate2.page';

const routes: Routes = [
  {
    path: '',
    component: NewEstimate2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewEstimate2PageRoutingModule {}
