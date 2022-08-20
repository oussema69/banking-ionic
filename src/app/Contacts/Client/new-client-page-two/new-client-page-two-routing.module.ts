import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewClientPageTwoPage } from './new-client-page-two.page';

const routes: Routes = [
  {
    path: '',
    component: NewClientPageTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewClientPageTwoPageRoutingModule {}
