import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Role } from '../models/RoleEnum';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrlAuth = 'http://localhost:3000/api/auth'; 
  private apiUrlUser = 'http://localhost:3000/api/users'; 

  constructor(private http: HttpClient) {
   }

  login(email: string, password: string): Observable<{userId:number, token: string,role:Role }> {
    const body = { email, password };
    return this.http.post<{ token: string ,userId:number,role:Role}>(`${this.apiUrlAuth}/login`, body);
  }

  register(name: string, email: string, password: string, role: string): Observable<{ userId: number, token: string ,role:Role}> {
    const body = { name, email, password, role };
    return this.http.post<{ userId: number, token: string ,role:Role}>(`${this.apiUrlAuth}/register`, body);
  }

  saveUserData(userId: number, token: string,role:Role) {
    sessionStorage.setItem('userId', userId.toString());
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
  }

  getUserId(): number | null {
    const userId = sessionStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
  getRole(): string | null {
    return sessionStorage.getItem('role');
  }
  clearUserData() {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
  }

  getUserById(userId: number, token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrlUser}/${userId}`, { headers });
  }
  
}
