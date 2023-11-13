import { Component } from '@angular/core';
import { Agency } from 'src/models/agency.model';
import { Director } from 'src/models/director.model';
import { Transaction, TransactionStatus, TransactionType } from 'src/models/transaction.model';
import { AuthService } from 'src/services/auth.service';
import { DirectorService } from 'src/services/director.service';
import { TransactionService } from 'src/services/transaction.service';
import { getTransactionStatusName, getTransactionTypeName } from '../utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {
  public isLoggedIn = false;
  agency: Agency | null = null;
  transactions: Transaction[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService, 
    private transactionService: TransactionService,
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
          if(agencyId) this.getTransactions(agencyId);
        }
      });
    }

    getTransactions(id: string) {
      this.transactionService.getTransactionsByAgencyId(id).subscribe((transactions) => {
        this.transactions = transactions;
      });
    }

    getTransactionTypeName(type: TransactionType): string {
      return getTransactionTypeName(type);
    }
  
    getTransactionStatusName(status: TransactionStatus): string {
      return getTransactionStatusName(status);
    }
}
