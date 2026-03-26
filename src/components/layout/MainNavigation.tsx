// MainNavigation - renders all sidebar sections including standalone country modules
import React, { useEffect, useMemo } from 'react';
import { Globe } from 'lucide-react';
import { navigationSections } from './navigationConfig';
import { useMainNavigation } from './useMainNavigation';
import MenuSection from './MenuSection';
import { NavigationSection } from './types';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'react-router-dom';

const sriLankaStandaloneFallback: NavigationSection = {
  title: "SRI LANKA",
  icon: Globe,
  color: "text-white",
  bgGradient: "from-amber-600 to-amber-800",
  borderColor: "border-amber-200",
  iconColor: "text-white",
  submenu: [
    {
      title: "INVOICING",
      items: [
        { name: "DASHBOARD", path: "/sri-lanka" },
        { name: "ADD NEW INVOICE", path: "/sri-lanka/invoice/add" },
      ],
    },
    {
      title: "COLLECTION & DELIVERY",
      items: [
        { name: "COLLECTION & DELIVERY", path: "/sri-lanka/collection-delivery" },
        { name: "ADD NEW JOB", path: "/sri-lanka/new-job" },
        { name: "VIEW SCHEDULES", path: "/sri-lanka/schedules" },
      ],
    },
    {
      title: "ACCOUNTS",
      items: [
        { name: "PAYMENT RECEIPT", path: "/sri-lanka/payment-receipt" },
        { name: "RECONCILIATION", path: "/sri-lanka/reconciliation" },
      ],
    },
  ],
};

export const MainNavigation: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  const sections = useMemo(() => ({
    ...navigationSections,
    sriLanka: navigationSections.sriLanka ?? sriLankaStandaloneFallback,
  }), []);

  const preferredOrder = ['upb', 'accounts', 'admin', 'cargo', 'sriLanka', 'saudiArabia'];
  const allSectionKeys = [
    ...preferredOrder.filter((key) => Boolean(sections[key])),
    ...Object.keys(sections).filter((key) => !preferredOrder.includes(key)),
  ];

  const { expandedSections, toggleSection, isPathActive, location } = useMainNavigation(sections, allSectionKeys);
  
  // Auto-expand the section that contains the current path
  useEffect(() => {
    if (location.pathname) {
      allSectionKeys.forEach(key => {
        const section = sections[key];
        if (!section) return;
        const hasActivePath = section.submenu.some(submenu => 
          submenu.items.some(item => isPathActive(item.path))
        );
        if (hasActivePath) {
          toggleSection(key);
        }
        if (location.pathname === '/accounts/profit-loss' && key === 'accounts') {
          toggleSection(key);
        }
      });
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const onNavigate = (path: string) => {
    console.log(`Navigating to ${path}`);
  };

  // Filter navigation sections based on user permissions
  const filteredSectionKeys = allSectionKeys.filter(sectionKey => {
    if (!currentUser || isAdmin) {
      return true; // Admin sees everything
    }
    
    // Map sections to permission keys
    const sectionPermissionMap: Record<string, keyof typeof currentUser.permissions> = {
      'upb': 'masterData',
      'accounts': 'accounting',
      'admin': 'controlPanel',
    };
    
    const requiredPermission = sectionPermissionMap[sectionKey];
    
    if (!requiredPermission) {
      return true; // If no specific permission required, show the section (cargo, sriLanka, saudiArabia, etc.)
    }
    
    return currentUser.permissions[requiredPermission] || false;
  });

  return (
    <nav className="w-full space-y-1">
      {filteredSectionKeys.map((sectionKey) => {
        const section = sections[sectionKey];
        if (!section) return null;
        return (
          <MenuSection
            key={sectionKey}
            sectionKey={sectionKey}
            section={section}
            expanded={!!expandedSections[sectionKey]}
            toggleSection={toggleSection}
            isPathActive={isPathActive}
            onNavigate={onNavigate}
          />
        );
      })}
    </nav>
  );
};

export default MainNavigation;
