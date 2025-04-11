
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavigationSection from './NavigationSection';
import { navigationConfig } from './navigationConfig';
import { useAuth } from '@/hooks/use-auth';
import { usePermissions } from '@/hooks/use-permissions';
import { hasFilePermission } from '@/utils/auth-utils';
import { ChevronDown } from 'lucide-react';

export const MainNavigation: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const { hasPermission } = usePermissions();

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Filter navigation items based on user permissions
  const filteredNavigation = navigationConfig
    .filter((section) => {
      // If section requires permission, check if user has it
      if (section.requiresPermission) {
        return hasPermission(section.requiresPermission);
      }
      return true;
    })
    .map((section) => ({
      ...section,
      children: section.children?.filter((item) => {
        // For file permissions
        if (item.filePermission) {
          return hasFilePermission(user, item.filePermission);
        }

        // For other permissions
        if (item.requiresPermission) {
          return hasPermission(item.requiresPermission);
        }

        return true;
      }),
    }));

  return (
    <nav className="w-full space-y-1">
      {filteredNavigation.map((section) => (
        <div key={section.key} className="mb-4">
          <div
            className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={() => toggleSection(section.key)}
          >
            <span className="flex items-center">
              {section.icon && <section.icon className="mr-2 h-5 w-5" />}
              {section.title}
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                expandedSections[section.key] ? 'rotate-180' : ''
              }`}
            />
          </div>

          {(expandedSections[section.key] || section.alwaysExpanded) && section.children && (
            <NavigationSection items={section.children} basePath={section.basePath} />
          )}
        </div>
      ))}
    </nav>
  );
};

export default MainNavigation;
