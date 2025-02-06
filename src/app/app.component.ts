import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from './services/task.service';
import { ListComponent } from './components/list/list.component';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        MatSlideToggleModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        RouterOutlet,
        ListComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'material';
}
