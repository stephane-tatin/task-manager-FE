import { Injectable, signal } from '@angular/core';
import { AppUser, Role } from '../models/app-user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080';
  appUserListSignal = signal<AppUser[]>([]);
  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    const fakeUsers: AppUser[] = [
      {
        id: 1,
        firstName: 'Stéphane',
        lastName: 'Tatin',
        userName: 'STE',
        password: 'password',
        role: Role.USER,
      },

      {
        id: 1,
        firstName: 'StéphaneAdmin',
        lastName: 'Tatin',
        userName: 'STE',
        password: 'password',
        role: Role.ADMIN,
      },
    ];

    this.http.get<AppUser[]>(`${this.baseUrl}/users`).subscribe({
      next: (users) => this.appUserListSignal.set(users),
      error: (err) => console.error('Failed to load users', err),
    });
  }

  updateAppUser(user: AppUser) {
    this.http.post<AppUser>(`${this.baseUrl}/users`, user).subscribe({
      next: (savedUser) => {
        this.appUserListSignal.update((users) =>
          users.map((user) => (user.id === savedUser.id ? savedUser : user))
        );
      },
      error: (err) => console.error('Failed to save user', err),
    });
  }

  saveAppUser(user: AppUser) {
    this.http.post<AppUser>(`${this.baseUrl}/users`, user).subscribe({
      next: (savedUser) => {
        this.appUserListSignal.update((users) => [...users, savedUser]);
      },
      error: (err) => console.error('Failed to save user', err),
    });
  }

  getAllAppUsers() {
    return this.appUserListSignal; // Return the signal for consumption
  }
}
