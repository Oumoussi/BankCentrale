import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/models/account.model';
import { Agency } from 'src/models/agency.model';
import { Manager } from 'src/models/manager.model';
import { AccountsService } from 'src/services/account.service';
import { AuthService } from 'src/services/auth.service';
import { ManagerService } from 'src/services/manager.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent {
  public isLoggedIn = false;
  agency: Agency | null = null;
  accounts: Account[] = [];
  
  constructor(
    private router: Router,
    private authService: AuthService, 
    private accountService: AccountsService,
    private managerService: ManagerService
    ) {
      this.authService.manager$.subscribe((manager) => {
        this.isLoggedIn = !!manager;
      });
    }

    ngOnInit() {
      this.authService.manager$.subscribe((manager) => {
        if (manager) {
          this.getAgency(manager);
        }
      });
    }

    getAgency(manager: Manager) {
      this.managerService.getAgencyByManagerId(manager.id).subscribe((agency) => {
        this.agency = agency;
        this.getAccounts(this.agency!.id);
      });
    }

    getAccounts(id: string) {
      this.accountService.getAccountsByAgencyId(id).subscribe((accounts) => {
        this.accounts = accounts;
      });
    }

    viewAccountDetails(id: string) {
      this.router.navigate(['/account-details', id]);
    }
}
