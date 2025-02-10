import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColumnService } from './column.service';
import { Column } from '../models/column';
import { ListFormComponent } from '../components/list-form/list-form.component';
import { ColumnWithTasks } from '../models/columnsWithTasks';
import { Task } from '../models/task.model';
import { TaskFormComponent } from '../components/task-form/task-form.component';
import { TaskService } from './task.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class FormDialogService {
  readonly dialog = inject(MatDialog);
  constructor(
    private columnService: ColumnService,
    private taskService: TaskService,
    private userService: UserService
  ) {}

  openListDialog(column?: ColumnWithTasks) {
    const dialogRef = this.dialog.open(ListFormComponent, {
      data: column,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const column: Column = result.data;
        if (column !== undefined && !column.id) {
          this.columnService.saveColumn(column);
        }
        if (column.id) {
          this.columnService.updateColumn(column);
        }
      }
    });
  }

  openTaskDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const task: Task = result.data;
        if (task !== undefined && !task.id) {
          this.taskService.saveTask(task);
        }
        if (task.id) {
          this.taskService.updateTask(task);
        }
      }
    });
  }
}
