
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavigationSectionProps } from "./types";
import { usePermissions } from "@/hooks/use-permissions";

const NavigationSection: React.FC<NavigationSectionProps> = ({
  sectionKey,
  section,
  isActive,
  onToggle,
  onNavigate,
  isPathActive,
}) => {
  const Icon = section.icon;
  const { hasFilePermission } = usePermissions();

  return (
    <div className="w-full mb-3">
      <button
        className={cn(
          "flex items-center justify-between w-full px-4 py-2.5 rounded-md text-left focus:outline-none",
          `nav-button-gradient-${sectionKey}`,
          isActive ? "shadow-md" : ""
        )}
        onClick={onToggle}
      >
        <div className="flex items-center">
          <Icon className={cn("mr-3 h-5 w-5", section.iconColor)} />
          <span className="font-bold">{section.title}</span>
        </div>
        {isActive ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      
      {isActive && (
        <div className="ml-6 mt-2 space-y-3 animate-accordion-down">
          {section.submenu.map((menu, index) => (
            <div key={index} className="space-y-1.5">
              <h4 className={cn(
                "font-semibold text-sm px-2 py-1 rounded", 
                `submenu-header-${sectionKey}`
              )}>
                {menu.title}
              </h4>
              <ul className="space-y-1">
                {menu.items.map((item, idx) => (
                  <li key={idx}>
                    <Link 
                      to={item.path}
                      className={cn(
                        "w-full block text-left px-3 py-1.5 text-sm rounded-md transition-all duration-200 transform hover:translate-x-1",
                        isPathActive(item.path)
                          ? `submenu-item-active-${sectionKey}`
                          : `submenu-item-${sectionKey} hover:bg-opacity-80`
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(item.path);
                      }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavigationSection;
