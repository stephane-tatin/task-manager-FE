import { Component, effect, inject } from '@angular/core';
import { ColumnWithTasks } from '../../models/columnsWithTasks';
import { ColumnService } from '../../services/column.service';
import { ListComponent } from '../list/list.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
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
import { ListFormComponent } from '../list-form/list-form.component';
import { Column } from '../../models/column';
import { FormDialogService } from '../../services/form-dialog.service';

@Component({
  selector: 'app-table',
  imports: [
    ListComponent,
    CommonModule,
    MatButton,
    MatInputModule,
    CdkDropList,
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
      console.log('hello', this.columnsWithTasks);
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
    console.log('updateing status');
    const assignedColumn = this.columnsWithTasks.find(
      (col) => col.id.toString() === event.container.id
    );
    const task = event.container.data.find((task) => {
      console.log(task.id);
      return task.id == event.item.element.nativeElement.id;
    });
    console.log('assignedColumn', assignedColumn);
    // console.log('task', task.id);
    console.log('task', event.item.element.nativeElement.id);

    if (assignedColumn && task) {
      this.taskService.updateTask(task);
    }
  }
}
