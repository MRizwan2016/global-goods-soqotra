import React from 'react';
import { navigationSections } from './navigationConfig';
import { useMainNavigation } from './useMainNavigation';
import MenuSection from './MenuSection';

export const MainNavigation: React.FC = () => {
  const sectionKeys = Object.keys(navigationSections);
  const { expandedSections, toggleSection, isPathActive } = useMainNavigation(sectionKeys);

  const onNavigate = (path: string) => {
    // No special logic presently; placeholder for mobile sidebar close etc
  };

  return (
    <nav className="w-full space-y-1">
      {sectionKeys.map((sectionKey) => {
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
