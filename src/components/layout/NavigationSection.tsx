
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavigationItem {
  title: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
  requiresPermission?: string;
  filePermission?: string;
}

interface NavigationSectionProps {
  navigationItems: NavigationItem[];
  basePath?: string;
}

const NavigationSection: React.FC<NavigationSectionProps> = ({ navigationItems, basePath = "" }) => {
  const location = useLocation();
  
  const isActive = (path: string): boolean => {
    // Modify to handle empty paths or home routes
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    
    // Handle exact matches
    if (path === location.pathname) {
      return true;
    }
    
    // Check if the current path starts with the given path (for nested routes)
    // But only if the path is not the root
    if (path !== "/" && path !== "") {
      return location.pathname.startsWith(path);
    }
    
    return false;
  };

  return (
    <div className="space-y-1 pl-10 mt-2">
      {navigationItems.map((item, index) => {
        const fullPath = item.path.startsWith("/") ? item.path : `${basePath}/${item.path}`;
        
        return (
          <Link
            key={index}
            to={fullPath}
            className={cn(
              "flex items-center text-sm px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100",
              isActive(item.path) && "bg-gray-100 text-gray-900 font-medium"
            )}
          >
            {item.icon && <item.icon className="h-4 w-4 mr-2" />}
            <span>{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavigationSection;
