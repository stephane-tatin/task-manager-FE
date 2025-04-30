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

  public loadData() {
    this.http.get<ColumnWithTasks[]>(`${this.baseUrl}/columns`).subscribe({
      next: (columns) => this.columnsWithTasks.set(columns),
      error: (err) => console.error('Failed to load tasks', err),
    });
  }

  updateColumn(column: Column) {
    console.log('updateing column', column);
    this.http
      .post<ColumnWithTasks>(`${this.baseUrl}/columns`, column)
      .subscribe({
        next: (savedColumn) => {
          console.log('savedColumn', savedColumn);
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
    this.http
      .post<ColumnWithTasks>(`${this.baseUrl}/columns`, column)
      .subscribe({
        next: (savedColumn) => {
          this.columnsWithTasks.update((columns) => [...columns, savedColumn]);
          this.loadData();
        },
        error: (err) => console.error('Failed to save column', err),
      });
  }

  getColumnsListWithTasks() {
    return this.columnsWithTasks;
  }
}
