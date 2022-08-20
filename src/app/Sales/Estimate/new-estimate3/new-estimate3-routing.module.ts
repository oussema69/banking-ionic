import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewEstimate3Page } from './new-estimate3.page';

const routes: Routes = [
  {
    path: '',
    component: NewEstimate3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewEstimate3PageRoutingModule {}
