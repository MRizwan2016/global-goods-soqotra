
import React, { useEffect } from 'react';
import { navigationSections } from './navigationConfig';
import { useMainNavigation } from './useMainNavigation';
import MenuSection from './MenuSection';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'react-router-dom';

export const MainNavigation: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  const sectionKeys = Object.keys(navigationSections);
  console.log('ALL SECTION KEYS:', sectionKeys, 'has sriLanka:', 'sriLanka' in navigationSections);
  const { expandedSections, toggleSection, isPathActive, location } = useMainNavigation(sectionKeys);
  
  // Auto-expand the section that contains the current path
  useEffect(() => {
    if (location.pathname) {
      // Find which section contains the current path
      sectionKeys.forEach(key => {
        const section = navigationSections[key];
        
        // Check if any item in this section matches the current path
        const hasActivePath = section.submenu.some(submenu => 
          submenu.items.some(item => isPathActive(item.path))
        );
        
        // If this section contains the current path, expand it
        if (hasActivePath) {
          toggleSection(key);
        }
        
        // Special case: Always expand accounts section when viewing profit-loss
        if (location.pathname === '/accounts/profit-loss' && key === 'accounts') {
          toggleSection(key);
        }
      });
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const onNavigate = (path: string) => {
    // No special logic presently; placeholder for mobile sidebar close etc
    console.log(`Navigating to ${path}`);
  };

  // Filter navigation sections based on user permissions
  const filteredSectionKeys = sectionKeys.filter(sectionKey => {
    console.log('=== DEBUGGING NAVIGATION FILTER ===');
    console.log('Current User:', currentUser);
    console.log('Is Admin:', isAdmin);
    console.log('Section Key:', sectionKey);
    
    if (!currentUser || isAdmin) {
      console.log('Admin or no user - showing all sections');
      return true; // Admin sees everything
    }
    
    // Map sections to permission keys
    const sectionPermissionMap: Record<string, keyof typeof currentUser.permissions> = {
      'upb': 'masterData', // UPB section requires masterData permission
      'accounts': 'accounting', // Accounts section requires accounting permission
      'admin': 'controlPanel', // Admin section requires controlPanel permission
      // Cargo section is available to all users
    };
    
    const requiredPermission = sectionPermissionMap[sectionKey];
    console.log('Required Permission for', sectionKey, ':', requiredPermission);
    
    if (!requiredPermission) {
      console.log('No permission required for', sectionKey, '- showing section');
      return true; // If no specific permission required, show the section
    }
    
    const hasPermission = currentUser.permissions[requiredPermission] || false;
    console.log('User has permission', requiredPermission, ':', hasPermission);
    console.log('All user permissions:', currentUser.permissions);
    
    return hasPermission;
  });

  console.log('Expanded sections:', expandedSections);
  console.log('Current path:', location.pathname);
  
  // Debug: Print all accounts navigation items
  if (navigationSections.accounts) {
    console.log('ACCOUNTS navigation config:');
    navigationSections.accounts.submenu.forEach(submenu => {
      console.log(`- ${submenu.title}:`, submenu.items.map(item => `${item.name} (${item.path})`));
    });
  }

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
