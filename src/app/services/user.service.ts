import { Injectable, signal } from '@angular/core';
import { AppUser } from '../models/app-user.model';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../constants';
import { optionsBase } from '../../config/https';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  appUserListSignal = signal<AppUser[]>([]);
  constructor(private http: HttpClient) {}

  loadInitialData() {
    this.http.get<AppUser[]>(`${baseUrl}/users`, optionsBase).subscribe({
      next: (users) => this.appUserListSignal.set(users),
      error: (err) => console.error('Failed to load users', err),
    });
  }

  updateAppUser(user: AppUser) {
    this.http.post<AppUser>(`${baseUrl}/users`, user, optionsBase).subscribe({
      next: (savedUser) => {
        this.appUserListSignal.update((users) =>
          users.map((user) => (user.id === savedUser.id ? savedUser : user))
        );
      },
      error: (err) => console.error('Failed to save user', err),
    });
  }

  saveAppUser(user: AppUser) {
    this.http.post<AppUser>(`${baseUrl}/users`, user, optionsBase).subscribe({
      next: (savedUser) => {
        this.appUserListSignal.update((users) => [...users, savedUser]);
      },
      error: (err) => console.error('Failed to save user', err),
    });
  }

  getAllAppUsers() {
    return this.appUserListSignal;
  }

  getUserById(id: string): AppUser | undefined {
    return (
      this.appUserListSignal() &&
      this.appUserListSignal().find((user) => user.id === id)
    );
  }
}
