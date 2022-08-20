import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCompanyPageTwoPage } from './new-company-page-two.page';

const routes: Routes = [
  {
    path: '',
    component: NewCompanyPageTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCompanyPageTwoPageRoutingModule {}
