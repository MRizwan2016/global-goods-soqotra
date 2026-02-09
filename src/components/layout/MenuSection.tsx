
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
  <div className="mb-2">
    <button
      className={`
        w-full rounded-lg px-3 py-2.5
        flex items-center justify-between
        transition-all duration-200 ease-out
        ${expanded 
          ? 'bg-[#2a3f5a] text-white' 
          : 'text-slate-300 hover:bg-[#253549] hover:text-white'
        }
      `}
      onClick={() => toggleSection(sectionKey)}
      data-testid={`toggle-section-${sectionKey}`}
    >
      <div className="flex items-center gap-3">
        <span className={`flex items-center justify-center p-1.5 rounded-md ${expanded ? 'bg-[#3b5998] text-white' : 'bg-[#2a3a4e] text-slate-400'} transition-colors duration-200`}>
          <section.icon className="h-4 w-4" />
        </span>
        <span className="uppercase font-semibold text-xs tracking-wide">
          {section.title}
        </span>
      </div>
      <ChevronRight
        className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
      />
    </button>
    
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
