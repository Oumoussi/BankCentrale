import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AccountListComponent } from './account-list/account-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'account-details/:id', component: AccountDetailsComponent },
  { path: 'customer-list', component: CustomerListComponent },
  { path: 'account-list', component: AccountListComponent },
  { path: 'transaction-list', component: TransactionListComponent },
  { path: 'transaction-create', component: TransactionFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }