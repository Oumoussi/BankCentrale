import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { setPort } from 'src/utils';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  port: number | undefined = undefined;

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    if (!this.port) this.port = setPort();
    return this.http.get<Account[]>(`http://localhost:${this.port}/api/accounts`);
  }

  getAccount(id: string): Observable<Account> {
    if (!this.port) this.port = setPort();
    const url = `http://localhost:${this.port}/api/accounts/${id}`;
    return this.http.get<Account>(url);
  }

  getAccountsByAgencyId(id: string): Observable<Account[]> {
    if (!this.port) this.port = setPort();
    return this.http.get<Account[]>(`http://localhost:${this.port}/api/accounts/agency/${id}`);
  }

  createAccount(newAccount: Account): Observable<Account> {
    if (!this.port) this.port = setPort();
    return this.http.post<Account>(`http://localhost:${this.port}/api/accounts`, newAccount);
  }

  updateAccount(id: string, updatedAccount: Account): Observable<Account> {
    if (!this.port) this.port = setPort();
    const url = `http://localhost:${this.port}/api/accounts/${id}`;
    return this.http.put<Account>(url, updatedAccount);
  }

  deleteAccount(id: string): Observable<void> {
    if (!this.port) this.port = setPort();
    const url = `http://localhost:${this.port}/api/accounts/${id}`;
    return this.http.delete<void>(url);
  }
}
