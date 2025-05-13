import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { ColumnService } from './column.service';
import { baseUrl } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient, private columnService: ColumnService) {}

  saveTask(task: Task) {
    this.http.post<Task>(`${baseUrl}/tasks`, task).subscribe({
      next: (savedTask) => {
        this.columnService.loadData();
      },
      error: (err) => console.error('Failed to save task', err),
    });
  }

  changeIndex(task: Task) {
    this.http.post<string>(`${baseUrl}/tasks/move`, task).subscribe({
      next: () => {
        this.columnService.loadData();
      },
      error: (err) => console.error('Failed to save task', err),
    });
  }

  delete(id: string) {
    this.http.delete<string>(`${baseUrl}/tasks/${id}`).subscribe({
      next: (savedTask) => {
        this.columnService.loadData();
      },
      error: (err) => console.error('Failed to save task', err),
    });
  }
}
