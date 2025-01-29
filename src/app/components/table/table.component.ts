import { Component, effect } from '@angular/core';
import { ColumnWithTasks } from '../../models/columnsWithTasks';
import { ColumnService } from '../../services/column.service';
import { ListComponent } from '../list/list.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Column } from '../../models/column';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Task } from '../../models/task.model';

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
  constructor(private columnService: ColumnService) {
    effect(() => {
      this.columnsWithTasks = this.columnService.getColumnsListWithTasks()();
    });
  }

  addList() {
    this.addingList = true;
  }

  saveEdit(titleInput: string) {
    this.columnService.saveColumn({ name: titleInput });
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log('event', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log('transfering');
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
