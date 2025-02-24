import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Priority, Task } from '../../models/task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-card',
    imports: [MatCardModule, MatButtonModule, MatIcon, CommonModule, CdkDrag],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() task!: Task;

  get priorityIcon() {
    const priority = this.task.priority;
    switch (priority) {
      case Priority.HIGH:
        return { name: 'keyboard_double_arrow_up', class: 'red' };
      case Priority.MODERATE:
        return { name: 'keyboard_double_arrow_up', class: 'blue' };
      case Priority.LOW:
        return { name: 'keyboard_double_arrow_down', class: 'blue' };
    }
    return { name: 'keyboard_double_arrow_down', class: 'blue' };
  }
}
