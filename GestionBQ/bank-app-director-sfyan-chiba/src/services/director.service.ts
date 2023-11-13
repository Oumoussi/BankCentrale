import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Director } from '../models/director.model';
import { Agency } from 'src/models/agency.model';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  private apiUrl = 'http://localhost:5100/api';

  constructor(private http: HttpClient) {}

  getDirectors(): Observable<Director[]> {
    return this.http.get<Director[]>(`${this.apiUrl}/directors`);
  }

  getDirectorById(id: string): Observable<Director> {
    return this.http.get<Director>(`${this.apiUrl}/directors/${id}`);
  }

  checkEmailAvailability(director: Director): Observable<Director> {
    return this.http.post<Director>(`http://localhost:5100/api/directors/checkEmailAvailability`, director);
  }

  createDirector(director: Director): Observable<Director> {
    return this.http.post<Director>(`${this.apiUrl}/directors`, director);
  }

  updateDirector(id: string, director: Director): Observable<Director> {
    return this.http.put<Director>(`${this.apiUrl}/directors/${id}`, director);
  }

  deleteDirector(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/directors/${id}`);
  }
}
