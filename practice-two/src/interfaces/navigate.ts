export interface NavigationItem {
  id: number;
  label: string;
  action: (item: NavigationItem) => void;
  icon: React.ReactNode;
}
