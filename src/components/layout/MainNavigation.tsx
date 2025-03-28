
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavigationSection from "./NavigationSection";
import { navigationSections } from "./navigationConfig";

const MainNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

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
    navigate(path);
  };

  const isPathActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-full p-2 animate-fade-in">
      <div className="flex justify-center mb-6">
        <img 
          src="/lovable-uploads/056bd63a-3806-4e08-9360-0e3edff62199.png" 
          alt="Soqotra Logo" 
          className="h-16 hover:scale-105 transition-transform"
        />
      </div>
      <div className="text-center mb-6">
        <p className="font-semibold text-sm text-gray-800 leading-tight">SOQOTRA LOGISTICS SERVICES,</p>
        <p className="font-semibold text-sm text-gray-800 leading-tight">TRANSPORTATION & TRADING WLL</p>
      </div>
      
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
