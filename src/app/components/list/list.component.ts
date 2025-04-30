import { Component, inject, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { MatListModule } from '@angular/material/list';
import { Task } from '../../models/task.model';
import { CardComponent } from '../card/card.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
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
        const task: Task = result.data;
        task.statusColumnId = this.column.id;
        this.taskService.saveTask(task);
      }
    });
  }

  openListDialog(column: ColumnWithTasks) {
    this.formDialogService.openListDialog(column);
  }
}
