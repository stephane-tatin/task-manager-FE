import { Task } from './task.model';

export interface ColumnWithTasks {
  id: string;
  title: string;
  tasks: Task[];
}
