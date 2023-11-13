import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Manager } from '../models/manager.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5100/api/managers/login';
  private managerSubject: BehaviorSubject<Manager | null>;
  public manager$: Observable<Manager | null>;

  constructor(private http: HttpClient) {
    // Retrieve manager data from storage, if available
    const storedManager = JSON.parse(localStorage.getItem('manager') || 'null');
    this.managerSubject = new BehaviorSubject<Manager | null>(storedManager);
    this.manager$ = this.managerSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl, { email, password }, httpOptions).pipe(
      tap(manager => {
        // Store the manager data in storage
        localStorage.setItem('manager', JSON.stringify(manager));
        this.managerSubject.next(manager);
      })
    );
  }

  logout(): void {
    // Remove the manager data from storage
    localStorage.removeItem('manager');
    this.managerSubject.next(null);
  }

  refresh(updatedManager: Manager) {
    this.managerSubject.next(updatedManager);
  }
}
