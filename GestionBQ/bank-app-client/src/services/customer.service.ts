import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { Account } from 'src/models/account.model';
import { mapAgencyWithPort, setPort } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  port: number | undefined = undefined;
  
  constructor(private http: HttpClient) {}
  
  getCustomers(): Observable<Customer[]> {
    if (!this.port) this.port = setPort();
    return this.http.get<Customer[]>(`http://localhost:${this.port}/api/customers`);
  }

  getCustomerById(id: string): Observable<Customer> {
    if (!this.port) this.port = setPort();
    return this.http.get<Customer>(`http://localhost:${this.port}/api/customers/${id}`);
  }

  getAccountsByCustomerId(id: string): Observable<Account[]> {
    if (!this.port) this.port = setPort();
    return this.http.get<Account[]>(`http://localhost:${this.port}/api/customers/${id}/accounts`);
  }

  createCustomer(customer: Customer, agencyId: string): Observable<Customer> {
    this.port = mapAgencyWithPort(agencyId);
    return this.http.post<Customer>(`http://localhost:${this.port}/api/customers`, customer);
  }

  checkEmailAvailability(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`http://localhost:5100/api/customers/checkEmailAvailability`, customer);
  }

  updateCustomer(id: string, customer: Customer): Observable<Customer> {
    if (!this.port) this.port = setPort();
    return this.http.put<Customer>(`http://localhost:${this.port}/api/customers/${id}`, customer);
  }

  deleteCustomer(id: string): Observable<void> {
    if (!this.port) this.port = setPort();
    return this.http.delete<void>(`http://localhost:${this.port}/api/customers/${id}`);
  }
}
