import { Injectable, signal } from '@angular/core';
import { ColumnWithTasks } from '../models/columnsWithTasks';
import { HttpClient } from '@angular/common/http';
import { Column } from '../models/column';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  private baseUrl = 'http://localhost:8080';
  public columnsWithTasks = signal<ColumnWithTasks[]>([]);
  constructor(private http: HttpClient) {
    this.loadData();
  }

  private loadData() {
    this.http.get<ColumnWithTasks[]>(`${this.baseUrl}/columns`).subscribe({
      next: (columns) => this.columnsWithTasks.set(columns),
      error: (err) => console.error('Failed to load tasks', err),
    });
  }

  // updateColumn(task: Task) {
  //   this.http.post<Task>(`${this.baseUrl}/tasks`, task).subscribe({
  //     next: (savedTask) => {
  //       this.taskListSignal.update((tasks) =>
  //         tasks.map((task) => (task.id === savedTask.id ? savedTask : task))
  //       );
  //     },
  //     error: (err) => console.error('Failed to save task', err),
  //   });
  // }

  saveColumn(column: Column) {
    this.http
      .post<ColumnWithTasks>(`${this.baseUrl}/columns`, column)
      .subscribe({
        next: (savedColumn) => {
          this.columnsWithTasks.update((columns) => [...columns, savedColumn]);
        },
        error: (err) => console.error('Failed to save task', err),
      });

    this.loadData;
  }

  getColumnsListWithTasks() {
    return this.columnsWithTasks; // Return the signal for consumption
  }
}
