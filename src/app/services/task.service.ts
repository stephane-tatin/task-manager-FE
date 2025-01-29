import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';
import { ColumnService } from './column.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:8080';
  private taskListSignal = signal<Task[]>([]);
  constructor(private http: HttpClient, private columnService: ColumnService) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.http.get<Task[]>(`${this.baseUrl}/tasks`).subscribe({
      next: (tasks) => this.taskListSignal.set(tasks),
      error: (err) => console.error('Failed to load tasks', err),
    });
  }

  updateTask(task: Task) {
    this.http.post<Task>(`${this.baseUrl}/tasks`, task).subscribe({
      next: (savedTask) => {
        this.columnService.columnsWithTasks.update((columns) => {
          return columns.map((column) => {
            if (column.id === savedTask.statusColumn.id) {
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
      error: (err) => console.error('Failed to save task', err),
    });
  }

  saveTask(task: Task) {
    this.http.post<Task>(`${this.baseUrl}/tasks`, task).subscribe({
      next: (savedTask) => {
        this.columnService.columnsWithTasks.update((columns) => {
          return columns.map((column) => {
            if (column.id === savedTask.statusColumn.id) {
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

  /**
   * Get the current task list signal
   */
  getAllTasks() {
    return this.taskListSignal; // Return the signal for consumption
  }
}
