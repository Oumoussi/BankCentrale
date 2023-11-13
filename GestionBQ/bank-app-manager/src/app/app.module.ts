import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AccountListComponent } from './account-list/account-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountDetailsComponent,
    TransactionFormComponent,
    NavbarComponent,
    CustomerListComponent,
    AccountListComponent,
    TransactionListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
