export interface Item {
  id: string;
  name: string;
  bgColor?: string;
  description?: string;
  isAssigned: boolean;
  isAssignedDirectly?: boolean;
  assignedTo?: {
    id?: string;
    name?: string;
  }[];
}