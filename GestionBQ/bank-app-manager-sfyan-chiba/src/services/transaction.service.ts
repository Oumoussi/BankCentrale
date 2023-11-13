import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { setPort } from 'src/utils';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  port: number | undefined = undefined;

  constructor(private http: HttpClient) {}

  getTransactionsByAccount(accountId: string): Observable<Transaction[]> {
    if (!this.port) this.port = setPort();
    return this.http.get<Transaction[]>(`http://localhost:${this.port}/api/accounts/${accountId}/transactions`);
  }

  getTransaction(transactionId: string): Observable<Transaction> {
    if (!this.port) this.port = setPort();
    return this.http.get<Transaction>(`http://localhost:${this.port}/api/transactions/${transactionId}`);
  }

  getTransactionsByAgencyId(id: string): Observable<Transaction[]> {
    if (!this.port) this.port = setPort();
    return this.http.get<Transaction[]>(`http://localhost:${this.port}/api/transactions/agency/${id}`);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    if (!this.port) this.port = setPort();
    return this.http.post<Transaction>(`http://localhost:${this.port}/api/transactions`, transaction);
  }

  updateTransaction(transactionId: string, transaction: Transaction): Observable<Transaction> {
    if (!this.port) this.port = setPort();
    return this.http.put<Transaction>(`http://localhost:${this.port}/api/transactions/${transactionId}`, transaction);
  }

  deleteTransaction(transactionId: string): Observable<void> {
    if (!this.port) this.port = setPort();
    return this.http.delete<void>(`http://localhost:${this.port}/api/transactions/${transactionId}`);
  }
}
