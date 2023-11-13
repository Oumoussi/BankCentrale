import { Component } from '@angular/core';
import { Account } from '../../models/account.model';
import { AuthService } from 'src/services/auth.service';
import { Customer } from '../../models/customer.model';
import { CustomerService } from 'src/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public isLoggedIn = false;
  
  customer: Customer | null = null;
  accounts: Account[] = [];

  constructor(
    private router : Router,
    private authService: AuthService, 
    private customerService: CustomerService
    ) {
      this.authService.customer$.subscribe((customer) => {
        this.isLoggedIn = !!customer;
      });
    }

  ngOnInit() {
    this.authService.customer$.subscribe((customer) => {
      this.customer = customer;
      if (customer) {
        this.customerService.getAccountsByCustomerId(customer.id).subscribe((accounts) => {
          this.accounts = accounts;
          this.router.navigate(['account-details', this.accounts[0].id]);
        });
      }
    });
  }

  viewAccountDetails(accountId: string) {
    this.router.navigate(['account-details', accountId]);
  }
}
