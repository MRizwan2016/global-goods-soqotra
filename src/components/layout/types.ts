
import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  name: string;
  path: string;
}

export interface NavigationSubmenu {
  title: string;
  items: NavigationItem[];
}

export interface NavigationSection {
  title: string;
  icon: LucideIcon;
  color: string;
  gradient?: string;
  iconColor: string;
  submenu: NavigationSubmenu[];
}

export interface NavigationSections {
  [key: string]: NavigationSection;
}

export interface NavigationSectionProps {
  sectionKey: string;
  section: NavigationSection;
  isActive: boolean;
  onToggle: () => void;
  onNavigate: (path: string) => void;
  isPathActive: (path: string) => boolean;
}
