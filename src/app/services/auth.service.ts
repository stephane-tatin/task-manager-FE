import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppUser, AuthUser } from '../models/app-user.model';
import { optionsBase } from '../../config/https';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  public authenticatedUser = signal<AuthUser | undefined>(undefined);

  public auth(user: AuthUser): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, user, {
      headers: this.headers,
      ...optionsBase,
    });
  }

  public getAuthUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/auth/me`, {
      headers: this.headers,
      ...optionsBase,
    });
  }
}
