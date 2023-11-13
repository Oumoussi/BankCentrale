import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from 'src/models/account.model';
import { Agency } from 'src/models/agency.model';
import { Director } from 'src/models/director.model';
import { AccountsService } from 'src/services/account.service';
import { AuthService } from 'src/services/auth.service';
import { DirectorService } from 'src/services/director.service';

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
    private route: ActivatedRoute,
    private authService: AuthService, 
    private accountService: AccountsService,
    private directorService: DirectorService
    ) {
      this.authService.director$.subscribe((director) => {
        this.isLoggedIn = !!director;
      });
    }

    ngOnInit() {
      this.authService.director$.subscribe((director) => {
        if (director) {
          var agencyId = this.route.snapshot.paramMap.get('id');
          if (agencyId) this.getAccounts(agencyId);
        }
      });
    }

    getAccounts(id: string) {
      this.accountService.getAccountsByAgencyId(id).subscribe((accounts) => {
        this.accounts = accounts;
      });
    }
}
