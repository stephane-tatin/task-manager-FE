import { Component } from '@angular/core';
import { ColumnService } from '../../services/column.service';
import { ListComponent } from '../list/list.component';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AppUser, AuthUser } from '../../models/app-user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  imports: [
    CommonModule,
    MatButton,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  constructor(
    private columnService: ColumnService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  getUsers(): AppUser[] {
    return this.userService.appUserListSignal();
  }

  getAuthUser(): string {
    return this.authService.authenticatedUser()?.username || '';
  }

  changeUser(user: AppUser) {
    const authUser: AuthUser = {
      username: user.userName,
      password: user.password,
    };
    this.authService.auth(authUser).subscribe((res) => {
      localStorage.setItem('authToken', res.token);
      this.columnService.loadData();
      this.userService.loadInitialData();
      this.authService.authenticatedUser.set(authUser);
    });
  }
}
