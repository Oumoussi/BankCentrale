import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from 'src/models/customer.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5100/api/customers/login';
  private customerSubject: BehaviorSubject<Customer | null>;
  public customer$: Observable<Customer | null>;

  constructor(private http: HttpClient) {
    // Retrieve customer data from storage, if available
    const storedCustomer = JSON.parse(localStorage.getItem('customer') || 'null');
    this.customerSubject = new BehaviorSubject<Customer | null>(storedCustomer);
    this.customer$ = this.customerSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl, { email, password }, httpOptions).pipe(
      tap(customer => {
        // Store the customer data in storage
        localStorage.setItem('customer', JSON.stringify(customer));
        this.customerSubject.next(customer);
      })
    );
  }

  logout(): void {
    // Remove the customer data from storage
    localStorage.removeItem('customer');
    this.customerSubject.next(null);
  }

  refresh(updatedCustomer: Customer) {
    this.customerSubject.next(updatedCustomer);
  }
}
