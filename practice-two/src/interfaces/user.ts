// Interfaces
import { Role, Rule } from '@interfaces';

export interface User {
  id?: string;
  userName: string;
  isActive: boolean;
  email: string;
  avatar: string;
  registered: string;
  lastVisited: string;
  details: string;
  bgColor: string;
  roles: Role[];
  rules: Rule[];
}
