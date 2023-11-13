/*
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionType, TransactionStatus, Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';
import { Manager } from 'src/models/manager.model';
import { Agency } from 'src/models/agency.model';
import { AuthService } from 'src/services/auth.service';
import { ManagerService } from 'src/services/manager.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {
  public isLoggedIn = false;
  
  manager: Manager | null = null;
  agency: Agency | null = null;

  transactionForm!: FormGroup;

  @Input()
  sourceAccount!: string;

  @Output()
  transactionCreated = new EventEmitter<Boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, 
    private managerService: ManagerService,
    private transactionService: TransactionService,
  ) {
      this.authService.manager$.subscribe((manager) => {
        this.isLoggedIn = !!manager;
      });
  }

  ngOnInit(): void {
    this.authService.manager$.subscribe((manager) => {
      this.manager = manager;
      if (manager) {
        this.getAgency(manager);
      }
    });
  }
  
  getAgency(manager: Manager) {
    this.managerService.getAgencyByManagerId(manager.id).subscribe((agency) => {
      this.agency = agency;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.transactionForm = this.formBuilder.group({
      amount: [null, [Validators.required, Validators.min(0)]],
      type: [TransactionType.Transfer],
      status: [TransactionStatus.Pending],
      agency: [this.agency?.id],
      sourceAccount: [''],
      destinationAccount: ['', Validators.required],
      // fee: [0]
    });
  }

  onSubmit(): void {
    console.log('Transaction form submitted');
    if (this.transactionForm.invalid) {
      console.log('Invalid form');
      return;
    }

    let transactionData = this.transactionForm.getRawValue() as Transaction;
    transactionData.sourceAccount = this.sourceAccount;
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
}
*/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionType, TransactionStatus, Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';
import { AuthService } from 'src/services/auth.service';
import { Manager } from 'src/models/manager.model';
import { Agency } from 'src/models/agency.model';
import { ManagerService } from 'src/services/manager.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {
  public isLoggedIn = false;
  
  manager: Manager | null = null;
  agency!: Agency;
  errorMessage: string = "";

  transactionForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, 
    private transactionService: TransactionService,
    private managerService: ManagerService,
  ) {
    this.authService.manager$.subscribe((manager) => {
      this.isLoggedIn = !!manager;
    });
  }

  ngOnInit(): void {
    this.authService.manager$.subscribe((manager) => {
      this.manager = manager;
      if (manager) {
        this.initializeForm();
        this.getAgency(manager);
      }
    });
  }
  
  getAgency(manager: Manager) {
    this.managerService.getAgencyByManagerId(manager.id).subscribe((agency) => {
      this.agency = agency;
    });
  }

  initializeForm(): void {
    this.transactionForm = this.formBuilder.group({
      amount: [null, [Validators.required, Validators.min(0)]],
      type: [null, Validators.required],
      // status: [TransactionStatus.Pending],
      sourceAccount: [''],
      destinationAccount: ['', Validators.required],
      agency: [''],
      // fee: [0]
    });
  }

  onSubmit(): void {
    this.errorMessage = "";
    if (this.transactionForm.invalid) {
      console.log('Invalid form');
      return;
    }

    let transactionData = this.transactionForm.getRawValue() as Transaction;

    transactionData.type = Number(transactionData.type);
    transactionData.agency = this.agency.id;

    console.log('Transaction data:', transactionData);
    this.transactionService.createTransaction(transactionData).subscribe(
      (response) => {
        console.log('Transaction created successfully:', response);
        this.transactionForm.reset();
      },
      (error) => {
        this.errorMessage = error.error;
        console.error('Failed to create transaction:', error);
      }
    );
  }

  getTransactionTypes(): any[] {
  return Object.keys(TransactionType)
    .filter(key => isNaN(Number(key)))
    .map(key => ({ value: TransactionType[key as keyof typeof TransactionType], label: key }));
  }
}