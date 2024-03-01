import { EnitityUserRoles } from "./enitity";

export interface Role extends EnitityUserRoles{
  id?: string;
  name: string;
  avatar: string;
  bgColor: string;
}
