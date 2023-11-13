import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Director } from '../models/director.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5100/api/directors/login';
  private directorSubject: BehaviorSubject<Director | null>;
  public director$: Observable<Director | null>;

  constructor(private http: HttpClient) {
    // Retrieve director data from storage, if available
    const storedDirector = JSON.parse(localStorage.getItem('director') || 'null');
    this.directorSubject = new BehaviorSubject<Director | null>(storedDirector);
    this.director$ = this.directorSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl, { email, password }, httpOptions).pipe(
      tap(director => {
        // Store the director data in storage
        localStorage.setItem('director', JSON.stringify(director));
        this.directorSubject.next(director);
      })
    );
  }

  logout(): void {
    // Remove the director data from storage
    localStorage.removeItem('director');
    this.directorSubject.next(null);
  }

  refresh(updatedDirector: Director) {
    this.directorSubject.next(updatedDirector);
  }
}
