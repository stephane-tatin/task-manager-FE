import { Task } from './task.model';

export interface ColumnWithTasks {
  id: number;
  name: string;
  tasks: Task[];
}
