
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavigationSection from './NavigationSection';
import { useAuth } from '@/hooks/use-auth';
import { usePermissions } from '@/hooks/use-permissions';
import { hasFilePermission } from '@/utils/auth-utils';
import { ChevronDown } from 'lucide-react';

// Updated navigation config with optional properties
interface NavigationItem {
  title: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
  filePermission?: string;
  requiresPermission?: string;
}

interface NavigationSection {
  key: string;
  title: string;
  icon: () => React.ReactNode;
  alwaysExpanded?: boolean;
  basePath?: string;
  requiresPermission?: string;
  children: NavigationItem[];
}

// Define navigation config directly in this file since there's an import error
const navigationConfig: NavigationSection[] = [
  {
    key: 'operations',
    title: 'Operations',
    icon: () => <span className="w-5 h-5 flex items-center justify-center">🛠️</span>,
    alwaysExpanded: true,
    children: [
      { title: 'Dashboard', path: '/' },
      { title: 'Jobs', path: '/qatar' },
      { title: 'Invoicing', path: '/data-entry/invoicing' }
    ]
  },
  {
    key: 'admin',
    title: 'Admin',
    icon: () => <span className="w-5 h-5 flex items-center justify-center">👤</span>,
    children: [
      { title: 'Booking Form Stock', path: '/invoice-method/booking-form-stock' },
      { title: 'Payment Collection', path: '/accounts/payment' }
    ]
  }
];

export const MainNavigation: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
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
          return hasFilePermission(currentUser, item.filePermission);
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
            className="flex items-between px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={() => toggleSection(section.key)}
          >
            <span className="flex items-center">
              {section.icon && <section.icon />}
              {section.title}
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                expandedSections[section.key] ? 'rotate-180' : ''
              }`}
            />
          </div>

          {(expandedSections[section.key] || section.alwaysExpanded) && section.children && (
            <NavigationSection 
              navigationItems={section.children} 
              basePath={section.basePath || ""} 
            />
          )}
        </div>
      ))}
    </nav>
  );
};

export default MainNavigation;
