import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agency } from 'src/models/agency.model';
import { Director } from 'src/models/director.model';
import { AccountsService } from 'src/services/account.service';
import { AgencyService } from 'src/services/agency.service';
import { AuthService } from 'src/services/auth.service';
import { CustomerService } from 'src/services/customer.service';
import { DirectorService } from 'src/services/director.service';
import { TransactionService } from 'src/services/transaction.service';

@Component({
  selector: 'app-agency-details',
  templateUrl: './agency-details.component.html',
  styleUrls: ['./agency-details.component.css']
})
export class AgencyDetailsComponent {
  public isLoggedIn = false;
  
  director: Director | null = null;
  agency: Agency | null = null;
  customersCount: number = 0;
  accountsCount: number = 0;
  transactionsCount: number = 0;
  newTransactionsCount: number = 0;
  

  constructor(
    private route: ActivatedRoute,
    private router : Router,
    private authService: AuthService, 
    private directorService: DirectorService,
    private customerService: CustomerService,
    private accountService: AccountsService,
    private transactionService: TransactionService,
    private agencyService: AgencyService
    ) {
      this.authService.director$.subscribe((director) => {
        this.isLoggedIn = !!director;
      });
    }

  ngOnInit() {
    this.authService.director$.subscribe((director) => {
      this.director = director;
      if (director) {
        var agencyId = this.route.snapshot.paramMap.get('id');
        if (agencyId) this.getAgency(agencyId);
      }
    });
  }
  
  getAgency(id: string) {
    this.agencyService.getAgency(id).subscribe((agency) => {
      this.agency = agency;
      this.getCustomersCount(this.agency!.id);
      this.getAccountsCount(this.agency!.id);
      this.getTransactionsCount(this.agency!.id);
    });
  }

  getCustomersCount(id: string) {
    this.customerService.getCustomersByAgencyId(id).subscribe((customers) => {
      this.customersCount = customers.length;
    });
  }

  getAccountsCount(id: string) {
    this.accountService.getAccountsByAgencyId(id).subscribe((accounts) => {
      this.accountsCount = accounts.length;
    });
  }

  getTransactionsCount(id: string) {
    this.transactionService.getTransactionsByAgencyId(id).subscribe((transactions) => {
      this.transactionsCount = transactions.length;
    });
  }
}
