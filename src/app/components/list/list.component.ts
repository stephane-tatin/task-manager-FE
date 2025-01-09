import { Component, effect, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { MatListModule } from '@angular/material/list';
import { FormTaskData, Task } from '../../models/task.model';
import { CardComponent } from '../card/card.component';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatListModule,
    CardComponent,
    MatDividerModule,
    MatIcon,
    MatCardModule,
    MatButton,
    MatDialogModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  tasksList: Task[] = [];
  readonly dialog = inject(MatDialog);
  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) {
    effect(() => {
      this.tasksList = this.taskService.getAllTasks()();
    });
  }

  openTaskDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      const task: Task = this.formTaskToTask(result.data);
      if (task !== undefined && !task.id) {
        this.taskService.saveTask(task);
      }
      if (task.id) {
        this.taskService.updateTask(task);
      }
    });
  }

  formTaskToTask(formTask: FormTaskData): Task {
    const task: Task = {
      ...formTask,
      assignedTo: this.userService
        .appUserListSignal()
        .find((user) => user.id.toString() == formTask?.assignedTo),
    };

    return task;
  }
}
