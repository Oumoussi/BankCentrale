import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionType, TransactionStatus, Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {
  transactionForm!: FormGroup;

  @Input()
  sourceAccount!: string;

  @Output()
  transactionCreated = new EventEmitter<Boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.transactionForm = this.formBuilder.group({
      amount: [null, [Validators.required, Validators.min(0)]],
      type: [TransactionType.Transfer],
      status: [TransactionStatus.Pending],
      sourceAccount: [''],
      destinationAccount: ['', Validators.required],
      // fee: [0]
    });
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) {
      return;
    }

    let transactionData = this.transactionForm.getRawValue() as Transaction;
    transactionData.sourceAccount = this.sourceAccount;
    transactionData.agency = JSON.parse(localStorage.getItem('customer') || '{}').agency;
    console.log('Transaction data:', transactionData);
    this.transactionService.createTransaction(transactionData).subscribe(
      (response) => {
        console.log('Transaction created successfully:', response);
        this.transactionForm.reset();
        this.transactionCreated.emit(true);
      },
      (error) => {
        console.error('Failed to create transaction:', error);
      }
    );
  }

  // getTransactionTypes(): any[] {
  // return Object.keys(TransactionType)
  //   .filter(key => isNaN(Number(key)))
  //   .map(key => ({ value: TransactionType[key as keyof typeof TransactionType], label: key }));
  // }

  // getTransactionStatuses(): any[] {
  //   return Object.keys(TransactionStatus)
  //     .filter(key => isNaN(Number(key)))
  //     .map(key => ({ value: TransactionStatus[key as keyof typeof TransactionStatus], label: key }));
  // }
}
