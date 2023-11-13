import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { Agency } from 'src/models/agency.model';
import { setPort } from 'src/utils';

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

  getCustomersByAgencyId(id: string): Observable<Customer[]> {
    if (!this.port) this.port = setPort();
    return this.http.get<Customer[]>(`http://localhost:${this.port}/api/customers/agency/${id}`);
  }

  getCustomerById(id: string): Observable<Customer> {
    if (!this.port) this.port = setPort();
    return this.http.get<Customer>(`http://localhost:${this.port}/api/customers/${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    if (!this.port) this.port = setPort();
    return this.http.post<Customer>(`http://localhost:${this.port}/api/customers`, customer);
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
