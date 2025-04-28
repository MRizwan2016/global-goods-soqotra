
import React from 'react';
import { navigationSections } from './navigationConfig';
import { useMainNavigation } from './useMainNavigation';
import MenuSection from './MenuSection';
import { useAuth } from '@/hooks/use-auth';

export const MainNavigation: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  const sectionKeys = Object.keys(navigationSections);
  const { expandedSections, toggleSection, isPathActive } = useMainNavigation(sectionKeys);

  const onNavigate = (path: string) => {
    // No special logic presently; placeholder for mobile sidebar close etc
  };

  // Filter navigation sections based on user permissions
  const filteredSectionKeys = sectionKeys.filter(sectionKey => {
    if (!currentUser || isAdmin) return true; // Admin sees everything
    
    // Map sections to permission keys
    const sectionPermissionMap: Record<string, keyof typeof currentUser.permissions> = {
      'upb': 'masterData', // UPB section requires masterData permission
      'accounts': 'accounting', // Accounts section requires accounting permission
      'admin': 'controlPanel', // Admin section requires controlPanel permission
      // Cargo section is available to all users
    };
    
    const requiredPermission = sectionPermissionMap[sectionKey];
    if (!requiredPermission) return true; // If no specific permission required, show the section
    
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
