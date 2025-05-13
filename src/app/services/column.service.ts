import { Injectable, signal } from '@angular/core';
import { ColumnWithTasks } from '../models/columnsWithTasks';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Column } from '../models/column';
import { baseUrl } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ColumnService {
  public columnsWithTasks = signal<ColumnWithTasks[]>([]);
  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  });
  constructor(private http: HttpClient) {}

  public loadData() {
    this.http
      .get<ColumnWithTasks[]>(`${baseUrl}/columns`, {
        headers: this.headers,
      })
      .subscribe({
        next: (columns) => this.columnsWithTasks.set(columns),
        error: (err) => console.error('Failed to load tasks', err),
      });
  }

  updateColumn(column: Column) {
    this.http.post<ColumnWithTasks>(`${baseUrl}/columns`, column).subscribe({
      next: (savedColumn) => {
        this.columnsWithTasks.update((columns) => {
          return columns.map((column) => {
            if (column.id === savedColumn.id) {
              return savedColumn;
            }
            return column;
          });
        });
        this.loadData();
      },
      error: (err) => console.error('Failed to update column', err),
    });
  }

  saveColumn(column: Column) {
    this.http.post<ColumnWithTasks>(`${baseUrl}/columns`, column).subscribe({
      next: (savedColumn) => {
        this.columnsWithTasks.update((columns) => [...columns, savedColumn]);
        this.loadData();
      },
      error: (err) => console.error('Failed to save column', err),
    });
  }

  delete(id: string) {
    this.http.delete<string>(`${baseUrl}/columns/${id}`).subscribe({
      next: (savedTask) => {
        this.loadData();
      },
      error: (err) => console.error('Failed to save task', err),
    });
  }

  getColumnsListWithTasks() {
    return this.columnsWithTasks;
  }
}
