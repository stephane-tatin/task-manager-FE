import { AppUser } from './app-user.model';

// Priority.ts
export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
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
