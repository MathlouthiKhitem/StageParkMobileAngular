import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../app/module/user';
import { Zone } from './module/Zone';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  login(newUser: User): Observable<User> {
    const url = 'http://localhost:8080/Backend/admin/login'; // Replace with your actual backend URL
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    return this.http.post<User>(url, newUser, httpOptions);
  }

  signup(newUser: User): Observable<User> {
    const url = 'http://localhost:8080/Backend/admin/addadmin'; // Replace with your actual backend URL
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    return this.http.post<User>(url, newUser, httpOptions);
  }
  signupAgent(newUser: User): Observable<User> {
    const url = 'http://localhost:8080/Backend/admin/addAgent'; // Replace with your actual backend URL
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    return this.http.post<User>(url, newUser, httpOptions);
  }

  agentAdded = new EventEmitter<User>();
  getUsersByType2(): Observable<any> {
    const apiUrl= 'http://localhost:8080/Backend/admin/users/type2';
   
    return this.http.get<any[]>(apiUrl);
  }
  addZone(zone: Zone): Observable<Zone> {
    const apiUrl= 'http://localhost:8080/Backend/admin/zone';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Zone>(apiUrl, zone, httpOptions);
  }
  geTzone(): Observable<any> {
    const apiUrl= 'http://localhost:8080/Backend/admin/zoneliste';
   
    return this.http.get<any[]>(apiUrl);
  }
 

  assignZoneToAgent(zoneId: string, agentId: string): Observable<any> {
    const url = 'http://localhost:8080/Backend/admin/assign'; // Replace with your actual backend URL
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const data = { zoneId: zoneId, agentId: agentId };

    return this.http.post<any>(url, data, httpOptions);
  }
  getUsers(agentId: string): Observable<any[]> {
    const apiUrl= 'http://localhost:8080/Backend/admin/agents';
    const url = `${apiUrl}/${agentId}/zone`;


    return this.http.get<any[]>(url);
  }
  getZoneTitlesWithMultipleOccurrences(): Observable<Map<string, string[]>> {
    const apiUrl= 'http://localhost:8080/Backend/admin';
    const url = `${apiUrl}/zone-titles-multiple-occurrences`;
    return this.http.get<Map<string, string[]>>(url);
  }

  getMaxDurationPerSession(): Observable<Map<string, Map<string, string>>> {
    const apiUrl= 'http://localhost:8080/Backend/admin';
    return this.http.get<Map<string, Map<string, string>>>(`${apiUrl}/max-durations`);
  }
}
