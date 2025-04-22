import { useState } from "react";
import { useLocation } from "react-router-dom";

export const useMainNavigation = (sectionKeys: string[]) => {
  // Keep all collapsed by default (matching the screenshot request)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    Object.fromEntries(sectionKeys.map((k) => [k, false]))
  );

  const location = useLocation();

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
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return { expandedSections, toggleSection, isPathActive, location };
};
