import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AccountListComponent } from './account-list/account-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { AgencyDetailsComponent } from './agency-details/agency-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'customer-list/:id', component: CustomerListComponent },
  { path: 'account-list/:id', component: AccountListComponent },
  { path: 'transaction-list/:id', component: TransactionListComponent },
  { path: 'agency-details/:id', component: AgencyDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }