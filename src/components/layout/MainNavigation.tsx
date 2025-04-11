
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavigationSection from './NavigationSection';
import { useAuth } from '@/hooks/use-auth';
import { usePermissions } from '@/hooks/use-permissions';
import { hasFilePermission } from '@/utils/auth-utils';
import { ChevronRight, Database, DollarSign, Settings, Truck } from 'lucide-react';
import { navigationSections } from './navigationConfig';

// Define types for navigation items
interface NavigationItem {
  title: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
  filePermission?: keyof typeof filePermissionTypes;
  requiresPermission?: keyof typeof permissionTypes;
}

// Define string literal types for permissions
const permissionTypes = {
  masterData: 'masterData',
  dataEntry: 'dataEntry',
  reports: 'reports',
  downloads: 'downloads',
  accounting: 'accounting',
  controlPanel: 'controlPanel',
  files: 'files'
} as const;

// Define string literal types for file permissions
const filePermissionTypes = {
  salesRep: 'salesRep',
  town: 'town',
  item: 'item',
  packageOptions: 'packageOptions',
  sellingRates: 'sellingRates',
  container: 'container',
  vessel: 'vessel',
  invoiceBook: 'invoiceBook',
  driverHelper: 'driverHelper',
  invoicing: 'invoicing',
  paymentReceivable: 'paymentReceivable',
  loadContainer: 'loadContainer',
  loadVessel: 'loadVessel',
  loadAirCargo: 'loadAirCargo',
  packingList: 'packingList',
  cargoReports: 'cargoReports',
  financialReports: 'financialReports',
  shippingReports: 'shippingReports',
  paymentMethods: 'paymentMethods',
  reconciliation: 'reconciliation',
  profitLoss: 'profitLoss'
} as const;

export const MainNavigation: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const { hasPermission } = usePermissions();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    // Initialize all sections as expanded by default
    upb: true,
    accounts: true,
    admin: true,
    cargo: true
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isPathActive = (path: string): boolean => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const onNavigate = (path: string) => {
    // Close the sidebar on mobile if needed
  };

  // Render navigation sections directly from the navigationSections config
  return (
    <nav className="w-full space-y-1">
      {Object.keys(navigationSections).map((sectionKey) => {
        const section = navigationSections[sectionKey];
        
        return (
          <div key={sectionKey} className="mb-6">
            <div
              className={`flex items-center justify-between px-3 py-2 text-sm font-bold ${section.color} hover:opacity-90 cursor-pointer`}
              onClick={() => toggleSection(sectionKey)}
            >
              <div className="flex items-center gap-3">
                <span className={`flex items-center justify-center p-1 rounded-md bg-white/10 ${section.iconColor}`}>
                  <section.icon className="h-5 w-5" />
                </span>
                <span className="uppercase">{section.title}</span>
              </div>
              <ChevronRight
                className={`h-4 w-4 transition-transform ${
                  expandedSections[sectionKey] ? 'rotate-90' : ''
                }`}
              />
            </div>

            {expandedSections[sectionKey] && (
              <div className="space-y-1 pl-10 mt-2">
                {section.submenu.map((submenu, idx) => (
                  <div key={`${sectionKey}-submenu-${idx}`} className="mb-3">
                    {/* Section header */}
                    <h3 className="text-xs font-semibold text-gray-700 mb-1">{submenu.title}</h3>
                    
                    {/* Navigation items */}
                    <div className="space-y-0.5">
                      {submenu.items.map((item, itemIdx) => (
                        <Link
                          key={`${sectionKey}-item-${itemIdx}`}
                          to={item.path}
                          className={`flex items-center text-sm px-3 py-1.5 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 ${
                            isPathActive(item.path) && "bg-gray-100 text-gray-900 font-medium"
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
