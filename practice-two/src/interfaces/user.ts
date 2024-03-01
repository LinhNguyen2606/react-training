import { EnitityUserRoles } from "./enitity";

export interface User extends EnitityUserRoles {
  id?: string;
  userName: string;
  isActive: boolean;
  email: string;
  avatar: string;
  registered: string;
  lastVisited: string;
  details: string;
  bgColor: string
}

export interface UserItem {
  userId: string;
  itemId?: string;
}
