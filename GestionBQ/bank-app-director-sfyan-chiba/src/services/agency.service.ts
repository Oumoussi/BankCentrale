import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agency } from '../models/agency.model';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  private apiUrl = 'http://localhost:5100/api';

  constructor(private http: HttpClient) {}

  getAgencies(): Observable<Agency[]> {
    return this.http.get<Agency[]>(`${this.apiUrl}/agencies`);
  }

  getAgency(agencyId: string): Observable<Agency> {
    return this.http.get<Agency>(`${this.apiUrl}/agencies/${agencyId}`);
  }

  createAgency(agency: Agency): Observable<Agency> {
    return this.http.post<Agency>(`${this.apiUrl}/agencies`, agency);
  }

  updateAgency(agencyId: string, agency: Agency): Observable<Agency> {
    return this.http.put<Agency>(`${this.apiUrl}/agencies/${agencyId}`, agency);
  }

  deleteAgency(agencyId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/agencies/${agencyId}`);
  }
}
