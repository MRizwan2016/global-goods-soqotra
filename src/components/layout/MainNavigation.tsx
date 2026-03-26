// MainNavigation - renders all sidebar sections including standalone country modules
import React, { useEffect } from 'react';
import { navigationSections } from './navigationConfig';
import { useMainNavigation } from './useMainNavigation';
import MenuSection from './MenuSection';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'react-router-dom';

export const MainNavigation: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  const allSectionKeys = Object.keys(navigationSections);
  const { expandedSections, toggleSection, isPathActive, location } = useMainNavigation(allSectionKeys);
  
  // Auto-expand the section that contains the current path
  useEffect(() => {
    if (location.pathname) {
      allSectionKeys.forEach(key => {
        const section = navigationSections[key];
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
        const section = navigationSections[sectionKey];
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
