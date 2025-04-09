
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavigationSection from "./NavigationSection";
import { navigationSections } from "./navigationConfig";
import { usePermissions } from "@/hooks/use-permissions";

const MainNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { hasFilePermission } = usePermissions();

  // Auto-expand the section based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Find which section contains the current path
    for (const [key, section] of Object.entries(navigationSections)) {
      for (const menu of section.submenu) {
        for (const item of menu.items) {
          if (currentPath.startsWith(item.path)) {
            setActiveSection(key);
            return;
          }
        }
      }
    }
  }, [location.pathname]);

  const handleNavigate = (path: string) => {
    console.log("Navigating to:", path);
    navigate(path);
  };

  const isPathActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-full p-2 animate-fade-in">
      <div className="flex flex-col space-y-2">
        {Object.entries(navigationSections).map(([key, section]) => (
          <NavigationSection
            key={key}
            sectionKey={key}
            section={section}
            isActive={activeSection === key}
            onToggle={() => setActiveSection(activeSection === key ? null : key)}
            onNavigate={handleNavigate}
            isPathActive={isPathActive}
          />
        ))}
      </div>
    </div>
  );
};

export default MainNavigation;
