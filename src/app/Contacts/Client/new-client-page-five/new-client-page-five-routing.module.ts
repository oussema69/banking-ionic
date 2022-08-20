import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewClientPageFivePage } from './new-client-page-five.page';

const routes: Routes = [
  {
    path: '',
    component: NewClientPageFivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewClientPageFivePageRoutingModule {}
