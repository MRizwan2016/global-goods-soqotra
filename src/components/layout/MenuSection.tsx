
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
  <div className="mb-6 animate-fade-in group">
    {/* Circular container with gradient background */}
    <div className={`
      relative rounded-3xl p-4 bg-gradient-to-br ${section.bgGradient || 'from-gray-300 to-gray-400'} 
      border-2 ${section.borderColor || 'border-gray-200'} shadow-lg
      transform transition-all duration-500 ease-out
      hover:scale-105 hover:shadow-2xl hover:rotate-1
      cursor-pointer group-hover:bg-opacity-90
    `}
    onClick={() => toggleSection(sectionKey)}
    data-testid={`toggle-section-${sectionKey}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className={`flex items-center justify-center p-2 rounded-full bg-white/20 ${section.iconColor} transform transition-transform duration-300 group-hover:scale-110`}>
              <section.icon className="h-5 w-5" />
            </span>
            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-125 transition-transform duration-300"></div>
          </div>
          <span className={`uppercase font-bold text-sm ${section.color} drop-shadow-lg`}>
            {section.title}
          </span>
        </div>
        <ChevronRight
          className={`h-4 w-4 ${section.color} transition-all duration-300 transform group-hover:translate-x-1 ${expanded ? 'rotate-90' : ''}`}
        />
      </div>
      
      {/* Animated glow effect */}
      <div className={`
        absolute inset-0 rounded-3xl bg-gradient-to-br ${section.bgGradient || 'from-gray-300 to-gray-400'} 
        opacity-0 group-hover:opacity-30 blur-xl
        transition-opacity duration-500 -z-10
      `}></div>
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
