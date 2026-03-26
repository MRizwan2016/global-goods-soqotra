
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavigationSections } from "./types";

export const useMainNavigation = (sections: NavigationSections, sectionKeys: string[]) => {
  // Initialize with empty object (all collapsed)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    Object.fromEntries(sectionKeys.map((k) => [k, false]))
  );

  const location = useLocation();

  useEffect(() => {
    // Auto-expand sections based on the current URL path
    const newExpandedSections = { ...expandedSections };
    
    // Find which section contains the current path
    sectionKeys.forEach(key => {
      const section = sections[key];
      if (!section) return;
      
      // Check if any item in this section matches the current path
      const hasActivePath = section.submenu.some(submenu => 
        submenu.items.some(item => isPathActive(item.path))
      );
      
      // If this section contains the current path, expand it
      if (hasActivePath) {
        newExpandedSections[key] = true;
      }

      // Special case: If we're on profit-loss page, ensure accounts section is expanded
      if (location.pathname === '/accounts/profit-loss' && key === 'accounts') {
        newExpandedSections[key] = true;
      }
    });
    
    setExpandedSections(newExpandedSections);
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isPathActive = (path: string): boolean => {
    // Match selling-rates and data-entry/selling-rates as in original code
    if (path === "/selling-rates" &&
        (location.pathname === "/selling-rates" || location.pathname.startsWith("/selling-rates/"))) {
      return true;
    }
    if (path === "/data-entry/selling-rates" &&
        (location.pathname === "/data-entry/selling-rates" || location.pathname.startsWith("/data-entry/selling-rates/"))) {
      return true;
    }
    
    // Special case for profit-loss to ensure it's recognized
    if (path === "/accounts/profit-loss" && location.pathname === "/accounts/profit-loss") {
      return true;
    }
    
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return { expandedSections, toggleSection, isPathActive, location };
};

export default useMainNavigation;
