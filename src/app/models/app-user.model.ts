export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
}

export interface AppUser {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  role?: Role;
}

export interface AuthUser {
  username: string;
  password: string;
}
