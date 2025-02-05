import { Component, effect } from '@angular/core';
import { ColumnWithTasks } from '../../models/columnsWithTasks';
import { ColumnService } from '../../services/column.service';
import { ListComponent } from '../list/list.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDragEnter,
} from '@angular/cdk/drag-drop';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    ListComponent,
    CommonModule,
    MatButton,
    MatLabel,
    MatFormField,
    MatInputModule,
    CdkDrag,
    CdkDropList,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  addingList = false;
  columnsWithTasks: ColumnWithTasks[] = [];
  cdkDropListConnectedIds: string[] = [];

  constructor(
    private columnService: ColumnService,
    private taskService: TaskService
  ) {
    effect(() => {
      this.columnsWithTasks = this.columnService.getColumnsListWithTasks()();
      console.log('hello', this.columnsWithTasks);
      this.cdkDropListConnectedIds = this.columnsWithTasks.map((column) =>
        column.id.toString()
      );
    });
  }

  addList() {
    this.addingList = true;
  }

  saveEdit(titleInput: string) {
    this.columnService.saveColumn({ name: titleInput });
  }

  drop(event: CdkDragDrop<Task[]>) {
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
      return task.id == +event.item.element.nativeElement.id;
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
      return task.id == +event.item.element.nativeElement.id;
    });
    if (assignedColumn && task) {
      task.statusColumn = {
        id: assignedColumn.id,
        name: assignedColumn.name,
      };
      this.taskService.updateTask(task);
    }
  }
}
