export interface NavigationItem {
  id: number;
  label: string;
  path: string;
  action?: (item: NavigationItem) => void;
  icon: React.ReactNode;
}
