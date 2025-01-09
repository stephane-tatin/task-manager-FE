export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
}

export interface AppUser {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  role?: Role;
}