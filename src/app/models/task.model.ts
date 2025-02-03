import { AppUser } from './app-user.model';
import { Column } from './column';

export enum Priority {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority?: Priority;
  createdAt?: Date;
  modifiedAt?: Date;
  targetTime?: Date;
  assignedTo?: AppUser;
  statusColumn: Column;
  index?: number;
}

export interface FormTaskData {
  id: number;
  title: string;
  description?: string;
  priority?: Priority;
  createdAt?: Date;
  modifiedAt?: Date;
  targetTime?: Date;
  assignedTo?: string;
}
