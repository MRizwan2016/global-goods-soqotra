
import React from "react";
import { ChevronRight } from "lucide-react";
import MenuItemList from "./MenuItemList";
import { NavigationSection } from "./types";

interface Props {
  sectionKey: string;
  section: NavigationSection;
  expanded: boolean;
  toggleSection: (key: string) => void;
  isPathActive: (path: string) => boolean;
  onNavigate?: (path: string) => void;
}

const MenuSection: React.FC<Props> = ({
  sectionKey,
  section,
  expanded,
  toggleSection,
  isPathActive,
  onNavigate,
}) => (
  <div className="mb-6 animate-fade-in">
    <div
      className={`flex items-center justify-between px-3 py-2 text-sm font-bold bg-[#F0F8FF] hover:bg-[#E6F3FF] transition-all duration-300 cursor-pointer rounded-md ${section.color}`}
      onClick={() => toggleSection(sectionKey)}
      data-testid={`toggle-section-${sectionKey}`}
    >
      <div className="flex items-center gap-3">
        <span className={`flex items-center justify-center p-1 rounded-md bg-white/10 ${section.iconColor}`}>
          <section.icon className="h-5 w-5" />
        </span>
        <span className="uppercase">{section.title}</span>
      </div>
      <ChevronRight
        className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`}
      />
    </div>
    {expanded && (
      <MenuItemList
        submenu={section.submenu}
        isPathActive={isPathActive}
        onNavigate={onNavigate}
        sectionKey={sectionKey}
      />
    )}
  </div>
);

export default MenuSection;
