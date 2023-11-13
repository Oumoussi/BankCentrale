import { Component } from '@angular/core';
import { Agency } from 'src/models/agency.model';
import { Manager } from 'src/models/manager.model';
import { Transaction, TransactionStatus, TransactionType } from 'src/models/transaction.model';
import { AuthService } from 'src/services/auth.service';
import { ManagerService } from 'src/services/manager.service';
import { TransactionService } from 'src/services/transaction.service';
import { getTransactionStatusName, getTransactionTypeName } from '../utils';

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
    private authService: AuthService, 
    private transactionService: TransactionService,
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
        this.getTransactions(this.agency!.id);
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

    changeTransactionState(index: number, value: boolean) {
      const id = this.transactions[index].id;
      if (value) this.transactions[index].status = TransactionStatus.Completed;
      else this.transactions[index].status = TransactionStatus.Failed;

      this.transactionService.updateTransaction(id, this.transactions[index]).subscribe(() => {
        this.getTransactions(this.agency!.id);
      });
      // this.transactionService.changeTransactionState(id, value).subscribe(() => {
      //   this.getTransactions(this.agency!.id);
      // });
    }
}
