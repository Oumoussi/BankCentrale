import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private apiUrl = 'http://localhost:5100/api/accounts';

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  getAccount(id: string): Observable<Account> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Account>(url);
  }

  getAccountsByAgencyId(id: string): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/agency/${id}`);
  }

  createAccount(newAccount: Account): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, newAccount);
  }

  updateAccount(id: string, updatedAccount: Account): Observable<Account> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Account>(url, updatedAccount);
  }

  deleteAccount(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
