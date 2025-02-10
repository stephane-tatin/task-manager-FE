import { Component, effect, inject, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { MatListModule } from '@angular/material/list';
import { Task } from '../../models/task.model';
import { CardComponent } from '../card/card.component';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { UserService } from '../../services/user.service';
import { ColumnWithTasks } from '../../models/columnsWithTasks';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormDialogService } from '../../services/form-dialog.service';

@Component({
  selector: 'app-list',
  imports: [
    MatListModule,
    CardComponent,
    MatDividerModule,
    MatCardModule,
    MatButton,
    MatDialogModule,
    DragDropModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input() column!: ColumnWithTasks;
  readonly dialog = inject(MatDialog);
  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private formDialogService: FormDialogService
  ) {}

  openTaskDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('res', result);
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

  openListDialog(column: ColumnWithTasks) {
    this.formDialogService.openListDialog(column);
  }
}
