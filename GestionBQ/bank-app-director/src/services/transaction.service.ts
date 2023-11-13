import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:5100/api';

  constructor(private http: HttpClient) {}

  getTransactionsByAccount(accountId: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/accounts/${accountId}/transactions`);
  }

  getTransaction(transactionId: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/transactions/${transactionId}`);
  }

  getTransactionsByAgencyId(id: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions/agency/${id}`);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transactions`, transaction);
  }

  updateTransaction(transactionId: string, transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/transactions/${transactionId}`, transaction);
  }

  deleteTransaction(transactionId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/transactions/${transactionId}`);
  }
}
