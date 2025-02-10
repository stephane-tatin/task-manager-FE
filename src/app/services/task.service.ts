import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';
import { ColumnService } from './column.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient, private columnService: ColumnService) {}

  updateTask(task: Task) {
    this.http.post<Task>(`${this.baseUrl}/tasks`, task).subscribe({
      next: (savedTask) => {
        this.columnService.columnsWithTasks.update((columns) => {
          return columns.map((column) => {
            if (column.id === savedTask.statusColumnId) {
              return {
                ...column,
                tasks: column.tasks.map((task) => {
                  if (task.id === savedTask.id) {
                    console.log('doing stuff');
                    return savedTask;
                  }
                  return task;
                }),
              };
            }
            return column;
          });
        });
      },
      error: (err) => console.error('Failed to update task', err),
    });
  }

  saveTask(task: Task) {
    this.http.post<Task>(`${this.baseUrl}/tasks`, task).subscribe({
      next: (savedTask) => {
        this.columnService.columnsWithTasks.update((columns) => {
          return columns.map((column) => {
            if (column.id === savedTask.statusColumnId) {
              return {
                ...column,
                tasks: column.tasks.concat(savedTask),
              };
            }
            return column;
          });
        });
      },
      error: (err) => console.error('Failed to save task', err),
    });
  }

  changeIndex(task: Task) {
    this.http.post<string>(`${this.baseUrl}/tasks/move`, task).subscribe({
      next: () => {
        console.log('task moved successfully');
        this.columnService.loadData();
      },
      error: (err) => console.error('Failed to save task', err),
    });
  }
}
