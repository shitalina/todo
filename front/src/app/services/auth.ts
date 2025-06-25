import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getCsrfToken(): Observable<any> {
    return this.http.get(`http://localhost:8000/sanctum/csrf-cookie`, { withCredentials: true });
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => {
        return this.http.post(`${this.apiUrl}/login`, credentials);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
