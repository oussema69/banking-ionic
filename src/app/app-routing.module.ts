import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./User/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./User/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'emailvalid/:email',
    loadChildren: () => import('./User/email-validation/email-validation.module').then( m => m.EmailValidationPageModule)
  },
  {
    path: 'new-client-page-one',
    loadChildren: () => import('./Contacts/Client/new-client-page-one/new-client-page-one.module').then( m => m.NewClientPageOnePageModule)
  },
  {
    path: 'new-client-page-two',
    loadChildren: () => import('./Contacts/Client/new-client-page-two/new-client-page-two.module').then( m => m.NewClientPageTwoPageModule)
  },
  {
    path: 'new-client-page-three',
    loadChildren: () => import('./Contacts/Client/new-client-page-three/new-client-page-three.module').then( m => m.NewClientPageThreePageModule)
  },
  {
    path: 'reset-password-page-one',
    loadChildren: () => import('./User/reset-password-page-one/reset-password-page-one.module').then( m => m.ResetPasswordPageOnePageModule)
  },
  {
    path: 'subscription',
    loadChildren: () => import('./User/subscription/subscription.module').then( m => m.SubscriptionPageModule)
  },
  {
    path: 'new-company-page-one',
    loadChildren: () => import('./User/Company/new-company-page-one/new-company-page-one.module').then( m => m.NewCompanyPageOnePageModule)
  },
  {
    path: 'new-company-page-two',
    loadChildren: () => import('./User/Company/new-company-page-two/new-company-page-two.module').then( m => m.NewCompanyPageTwoPageModule)
  },
  {
    path: 'new-company-page-three',
    loadChildren: () => import('./User/Company/new-company-page-three/new-company-page-three.module').then( m => m.NewCompanyPageThreePageModule)
  },
  {
    path: 'edit-client/:id',
    loadChildren: () => import('./Contacts/Client/edit-client/edit-client.module').then( m => m.EditClientPageModule)
  },
  {
    path: 'client-popover',
    loadChildren: () => import('./Contacts/Client/client-popover/client-popover.module').then( m => m.ClientPopoverPageModule)
  },
  {
    path: 'new-client-page-foor',
    loadChildren: () => import('./Contacts/Client/new-client-page-foor/new-client-page-foor.module').then( m => m.NewClientPageFoorPageModule)
  },
  {
    path: 'new-client-page-five',
    loadChildren: () => import('./Contacts/Client/new-client-page-five/new-client-page-five.module').then( m => m.NewClientPageFivePageModule)
  },
  {
    path: 'client-invoices/:id',
    loadChildren: () => import('./Contacts/Client/client-invoices/client-invoices.module').then( m => m.ClientInvoicesPageModule)
  },
  {
    path: 'client-payments/:id',
    loadChildren: () => import('./Contacts/Client/client-payments/client-payments.module').then( m => m.ClientPaymentsPageModule)
  },
  {
    path: 'client-synthesis/:id',
    loadChildren: () => import('./Contacts/Client/client-synthesis/client-synthesis.module').then( m => m.ClientSynthesisPageModule)
  },
  {
    path: 'client-timeline/:id',
    loadChildren: () => import('./Contacts/Client/client-timeline/client-timeline.module').then( m => m.ClientTimelinePageModule)
  },
  {
    path: 'new-estimate',
    loadChildren: () => import('./Sales/Estimate/new-estimate/new-estimate.module').then( m => m.NewEstimatePageModule)
  },
  {
    path: 'new-estimate2',
    loadChildren: () => import('./Sales/Estimate/new-estimate2/new-estimate2.module').then( m => m.NewEstimate2PageModule)
  },
  {
    path: 'new-estimate3',
    loadChildren: () => import('./Sales/Estimate/new-estimate3/new-estimate3.module').then( m => m.NewEstimate3PageModule)
  },
  {
    path: 'new-estimate4',
    loadChildren: () => import('./Sales/Estimate/new-estimate4/new-estimate4.module').then( m => m.NewEstimate4PageModule)
  },
  {
    path: 'edit-estimate',
    loadChildren: () => import('./Sales/Estimate/edit-estimate/edit-estimate.module').then( m => m.EditEstimatePageModule)
  },

  {
    path: 'estimate-popover',
    loadChildren: () => import('./Sales/Estimate/estimate-popover/estimate-popover.module').then( m => m.EstimatePopoverPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
