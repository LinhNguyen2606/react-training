export interface NavigationItem {
  id: number;
  label: string;
  path: string;
  action: () => void;
  icon: React.ReactNode;
}
