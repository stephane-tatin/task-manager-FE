import { Component, effect, inject } from '@angular/core';
import { ColumnWithTasks } from '../../models/columnsWithTasks';
import { ColumnService } from '../../services/column.service';
import { ListComponent } from '../list/list.component';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogService } from '../../services/form-dialog.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AppUser, AuthUser } from '../../models/app-user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-table',
  imports: [
    ListComponent,
    CommonModule,
    MatButton,
    MatInputModule,
    CdkDropList,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  addingList = false;
  columnsWithTasks: ColumnWithTasks[] = [];
  cdkDropListConnectedIds: string[] = [];
  readonly dialog = inject(MatDialog);

  constructor(
    private columnService: ColumnService,
    private taskService: TaskService,
    private formDialogService: FormDialogService
  ) {
    effect(() => {
      this.columnsWithTasks = this.columnService.getColumnsListWithTasks()();
      this.cdkDropListConnectedIds = this.columnsWithTasks.map((column) =>
        column.id.toString()
      );
    });
  }

  openListDialog() {
    this.formDialogService.openListDialog();
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateIndex(event);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateStatusColumn(event);
    }
  }

  updateIndex(event: CdkDragDrop<Task[]>) {
    const task = event.container.data.find((task) => {
      return task.id == event.item.element.nativeElement.id;
    });
    if (task) {
      task.index = event.currentIndex;

      this.taskService.changeIndex(task);
    }
  }

  updateStatusColumn(event: CdkDragDrop<Task[]>) {
    const assignedColumn = this.columnsWithTasks.find(
      (col) => col.id.toString() === event.container.id
    );
    const task = event.container.data.find((task) => {
      console.log(task.id);
      return task.id == event.item.element.nativeElement.id;
    });

    if (task && assignedColumn) {
      task.statusColumnId = assignedColumn?.id;
      this.taskService.saveTask(task);
      this.updateIndex(event);
    }
  }
}
