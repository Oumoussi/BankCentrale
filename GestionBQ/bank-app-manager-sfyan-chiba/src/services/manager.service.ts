import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager } from '../models/manager.model';
import { Agency } from 'src/models/agency.model';
import { setPort } from 'src/utils';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  port: number | undefined = undefined;

  constructor(private http: HttpClient) {}

  getManagers(): Observable<Manager[]> {
    if (!this.port) this.port = setPort();
    return this.http.get<Manager[]>(`http://localhost:${this.port}/api/managers`);
  }

  getManagerById(id: string): Observable<Manager> {
    if (!this.port) this.port = setPort();
    return this.http.get<Manager>(`http://localhost:${this.port}/api/managers/${id}`);
  }

  checkEmailAvailability(manager: Manager): Observable<Manager> {
    return this.http.post<Manager>(`http://localhost:5100/api/managers/checkEmailAvailability`, manager);
  }

  getAgencyByManagerId(id: string): Observable<Agency> {
    if (!this.port) this.port = setPort();
    return this.http.get<Agency>(`http://localhost:${this.port}/api/managers/${id}/agency`);
  }

  createManager(manager: Manager): Observable<Manager> {
    if (!this.port) this.port = setPort();
    return this.http.post<Manager>(`http://localhost:${this.port}/api/managers`, manager);
  }

  updateManager(id: string, manager: Manager): Observable<Manager> {
    if (!this.port) this.port = setPort();
    return this.http.put<Manager>(`http://localhost:${this.port}/api/managers/${id}`, manager);
  }

  deleteManager(id: string): Observable<void> {
    if (!this.port) this.port = setPort();
    return this.http.delete<void>(`http://localhost:${this.port}/api/managers/${id}`);
  }
}
