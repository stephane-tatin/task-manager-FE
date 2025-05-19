import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { ColumnService } from './services/column.service';
import { AuthUser } from './models/app-user.model';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private columnService: ColumnService
  ) {}

  defaultUser: AuthUser = {
    username: 'STE',
    password: 'password',
  };

  ngOnInit(): void {
    this.authService
      .getAuthUser()
      .pipe(
        switchMap((user) =>
          !!user ? of(user) : this.authService.auth(this.defaultUser)
        )
      )
      .subscribe((res) => {
        console.log('res', res);
        this.columnService.loadData();
        this.userService.loadInitialData();
        this.authService.authenticatedUser.set(res);
      });

    // this.authService.auth(this.defaultUser).subscribe((res) => {
    //   this.columnService.loadData();
    //   this.userService.loadInitialData();
    //   this.authService.authenticatedUser.set(this.defaultUser);
    // });
  }

  title = 'material';
}
