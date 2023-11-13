import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager } from '../models/manager.model';
import { Agency } from 'src/models/agency.model';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private apiUrl = 'http://localhost:5100/api';

  constructor(private http: HttpClient) {}

  getManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(`${this.apiUrl}/managers`);
  }

  getManagerById(id: string): Observable<Manager> {
    return this.http.get<Manager>(`${this.apiUrl}/managers/${id}`);
  }

  getAgencyByManagerId(id: string): Observable<Agency> {
    return this.http.get<Agency>(`${this.apiUrl}/managers/${id}/agency`);
  }

  createManager(manager: Manager): Observable<Manager> {
    return this.http.post<Manager>(`${this.apiUrl}/managers`, manager);
  }

  updateManager(id: string, manager: Manager): Observable<Manager> {
    return this.http.put<Manager>(`${this.apiUrl}/managers/${id}`, manager);
  }

  deleteManager(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/managers/${id}`);
  }
}
