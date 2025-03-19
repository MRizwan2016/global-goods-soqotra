
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import NavigationSection from "./NavigationSection";
import { navigationSections } from "./navigationConfig";

const MainNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const isPathActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-full p-4 animate-fade-in">
      <div className="flex justify-center mb-6">
        <img 
          src="/lovable-uploads/056bd63a-3806-4e08-9360-0e3edff62199.png" 
          alt="Soqotra Logo" 
          className="h-16 hover-scale"
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
