import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCompanyPageThreePage } from './new-company-page-three.page';

const routes: Routes = [
  {
    path: '',
    component: NewCompanyPageThreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCompanyPageThreePageRoutingModule {}
