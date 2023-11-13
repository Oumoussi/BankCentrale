import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Account } from '../../models/account.model';
import { AccountsService } from 'src/services/account.service';
import { TransactionService } from 'src/services/transaction.service';
import { Transaction, TransactionType, TransactionStatus } from '../../models/transaction.model';
import { getTransactionStatusName, getTransactionTypeName } from '../utils';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  public isLoggedIn = false;
  
  account!: Account;
  transactions: Transaction[] = [];

  constructor(
    private route: ActivatedRoute, 
    private accountService: AccountsService,
    private transactionService: TransactionService,
    private authService: AuthService
    ) {
      this.authService.manager$.subscribe((manager) => {
        this.isLoggedIn = !!manager;
      });
    }

  ngOnInit() {
    var accountId = this.route.snapshot.paramMap.get('id');
    if (accountId) {
      this.accountService.getAccount(accountId).subscribe(account => this.account = account);
      this.transactionService.getTransactionsByAccount(accountId).subscribe(transactions => this.transactions = transactions);
    }
  }

  getTransactionTypeName(type: TransactionType): string {
    return getTransactionTypeName(type);
  }

  getTransactionStatusName(status: TransactionStatus): string {
    return getTransactionStatusName(status);
  }
}
