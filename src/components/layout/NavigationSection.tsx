
import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavigationSectionProps } from "./types";

const NavigationSection: React.FC<NavigationSectionProps> = ({
  sectionKey,
  section,
  isActive,
  onToggle,
  onNavigate,
  isPathActive,
}) => {
  const Icon = section.icon;

  return (
    <div className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "justify-between w-full px-4 py-3 border rounded-md transition-all duration-300 hover:scale-105 bg-gradient-to-r",
          section.color,
          isActive ? "shadow-md" : ""
        )}
        onClick={onToggle}
      >
        <div className="flex items-center">
          <Icon className={cn("mr-3 h-5 w-5", section.iconColor)} />
          <span className="font-bold">{section.title}</span>
        </div>
        {isActive ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>
      
      {isActive && (
        <div className="ml-8 mt-2 space-y-4 animate-accordion-down">
          {section.submenu.map((menu, index) => (
            <div key={index} className="space-y-1">
              <h4 className="font-medium text-sm text-gray-700 px-2">{menu.title}</h4>
              <ul className="space-y-1">
                {menu.items.map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => onNavigate(item.path)}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm rounded-md transition-colors",
                        isPathActive(item.path)
                          ? "bg-gray-100 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      {item.name}
                    </button>
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
