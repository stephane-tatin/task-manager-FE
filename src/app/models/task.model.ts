import { AppUser } from './app-user.model';
import { Column } from './column';

export enum Priority {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority?: Priority;
  createdAt?: Date;
  modifiedAt?: Date;
  targetTime?: Date;
  assignedToId?: string;
  statusColumnId: string;
  index?: number;
}
