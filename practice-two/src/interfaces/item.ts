import { User } from "@interfaces";

export interface Item extends User{
  id?: string;
  name?: string;
  description?: string;
  isAssigned?: boolean;
  isRoleAssigned?: boolean;
  assignedTo?: {
    id?: string;
    name?: string;
    bgColor?: string;
  }[];
}