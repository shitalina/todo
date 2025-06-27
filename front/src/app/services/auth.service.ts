import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    this.checkLoginStatus().subscribe();
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap(() => this.loggedIn.next(true))
    );
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap(() => this.loggedIn.next(true))
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => this.loggedIn.next(false))
    );
  }

  private checkLoginStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`).pipe(
      tap(() => this.loggedIn.next(true)),
      catchError(() => {
        this.loggedIn.next(false);
        return of(null);
      })
    );
  }
}