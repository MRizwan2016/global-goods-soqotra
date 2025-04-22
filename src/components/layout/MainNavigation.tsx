
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { navigationSections } from './navigationConfig';

export const MainNavigation: React.FC = () => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    upb: false,
    accounts: false,
    admin: false,
    cargo: false
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isPathActive = (path: string): boolean => {
    // Consider /selling-rates and /selling-rates/* as active for the selling rates menu item
    if (path === "/selling-rates" && 
        (location.pathname === "/selling-rates" || location.pathname.startsWith("/selling-rates/"))) {
      return true;
    }
    
    // Same for data-entry/selling-rates
    if (path === "/data-entry/selling-rates" && 
        (location.pathname === "/data-entry/selling-rates" || location.pathname.startsWith("/data-entry/selling-rates/"))) {
      return true;
    }
    
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const onNavigate = (path: string) => {
    // Close the sidebar on mobile if needed
  };

  return (
    <nav className="w-full space-y-1">
      {Object.keys(navigationSections).map((sectionKey) => {
        const section = navigationSections[sectionKey];
        
        return (
          <div key={sectionKey} className="mb-6 animate-fade-in">
            <div
              className={`flex items-center justify-between px-3 py-2 text-sm font-bold bg-[#F0F8FF] hover:bg-[#E6F3FF] transition-all duration-300 cursor-pointer rounded-md ${section.color}`}
              onClick={() => toggleSection(sectionKey)}
            >
              <div className="flex items-center gap-3">
                <span className={`flex items-center justify-center p-1 rounded-md bg-white/10 ${section.iconColor}`}>
                  <section.icon className="h-5 w-5" />
                </span>
                <span className="uppercase">{section.title}</span>
              </div>
              <ChevronRight
                className={`h-4 w-4 transition-transform duration-300 ${
                  expandedSections[sectionKey] ? 'rotate-90' : ''
                }`}
              />
            </div>

            {expandedSections[sectionKey] && (
              <div className="space-y-1 pl-10 mt-2 animate-slide-in">
                {section.submenu.map((submenu, idx) => (
                  <div key={`${sectionKey}-submenu-${idx}`} className="mb-3">
                    <h3 className="text-xs font-semibold text-gray-700 mb-1">{submenu.title}</h3>
                    
                    <div className="space-y-0.5">
                      {submenu.items.map((item, itemIdx) => (
                        <Link
                          key={`${sectionKey}-item-${itemIdx}`}
                          to={item.path}
                          className={`flex items-center text-sm px-3 py-1.5 rounded-md text-gray-600 hover:bg-[#F0F8FF] hover:text-gray-900 transition-all duration-200 ${
                            isPathActive(item.path) && "bg-[#F0F8FF] text-gray-900 font-medium"
                          }`}
                          onClick={() => onNavigate(item.path)}
                        >
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default MainNavigation;

