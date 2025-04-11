
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavigationSection from './NavigationSection';
import { useAuth } from '@/hooks/use-auth';
import { usePermissions } from '@/hooks/use-permissions';
import { hasFilePermission } from '@/utils/auth-utils';
import { ChevronRight, Database, DollarSign, Settings, Truck } from 'lucide-react';

// Types for navigation items
interface NavigationItem {
  title: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
  filePermission?: string | undefined;
  requiresPermission?: string | undefined;
}

interface NavigationSection {
  key: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  iconColor: string;
  basePath?: string;
  requiresPermission?: string | undefined;
  children: NavigationItem[];
}

// Define navigation config using the navigationSections format
const navigationConfig: NavigationSection[] = [
  {
    key: 'upb',
    title: 'UPB',
    icon: <Database className="h-5 w-5" />,
    color: 'text-green-800',
    iconColor: 'text-green-700',
    children: [
      { title: 'Dashboard', path: '/' },
      { title: 'Jobs', path: '/qatar' },
      { title: 'Invoicing', path: '/data-entry/invoicing' }
    ]
  },
  {
    key: 'accounts',
    title: 'ACCOUNTS',
    icon: <DollarSign className="h-5 w-5" />,
    color: 'text-purple-800',
    iconColor: 'text-purple-700',
    children: [
      { title: 'Payment Collection', path: '/accounts/payment' }
    ]
  },
  {
    key: 'admin',
    title: 'ADMIN',
    icon: <Settings className="h-5 w-5" />,
    color: 'text-rose-800',
    iconColor: 'text-rose-700',
    children: [
      { title: 'Booking Form Stock', path: '/invoice-method/booking-form-stock' },
      { title: 'Control Panel', path: '/admin/control-panel' }
    ]
  },
  {
    key: 'cargo',
    title: 'CARGO COLLECTION & DELIVERY',
    icon: <Truck className="h-5 w-5" />,
    color: 'text-sky-800',
    iconColor: 'text-sky-700',
    children: [
      { title: 'Dashboard', path: '/qatar' },
      { title: 'Jobs', path: '/qatar/jobs' }
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
        <div key={section.key} className="mb-6">
          <div
            className={`flex items-center justify-between px-3 py-2 text-sm font-bold ${section.color} hover:opacity-90 cursor-pointer`}
            onClick={() => toggleSection(section.key)}
          >
            <div className="flex items-center gap-3">
              <span className={`flex items-center justify-center p-1 rounded-md bg-white/10 ${section.iconColor}`}>
                {section.icon}
              </span>
              <span className="uppercase">{section.title}</span>
            </div>
            <ChevronRight
              className={`h-4 w-4 transition-transform ${
                expandedSections[section.key] ? 'rotate-90' : ''
              }`}
            />
          </div>

          {(expandedSections[section.key]) && section.children && (
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
