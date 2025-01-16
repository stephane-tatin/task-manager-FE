import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Priority, Task } from '../models/task.model';
import { AppUser, Role } from '../models/app-user.model';
import { from, Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:8080';
  private taskListSignal = signal<Task[]>([]);
  constructor(private http: HttpClient) {
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
        this.taskListSignal.update((tasks) =>
          tasks.map((task) => (task.id === savedTask.id ? savedTask : task))
        );
      },
      error: (err) => console.error('Failed to save task', err),
    });
  }

  saveTask(task: Task) {
    this.http.post<Task>(`${this.baseUrl}/tasks`, task).subscribe({
      next: (savedTask) => {
        this.taskListSignal.update((tasks) => [...tasks, savedTask]);
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
