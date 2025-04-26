
import React, { ReactNode } from 'react';
import BackgroundOverlay from './BackgroundOverlay';
import DashboardContent from './DashboardContent';

interface DashboardLayoutProps {
  children: ReactNode;
  isLoaded: boolean;
}

const DashboardLayout = ({ children, isLoaded }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F8FF] to-white relative">
      <BackgroundOverlay />
      <DashboardContent isLoaded={isLoaded}>
        {children}
      </DashboardContent>
    </div>
  );
};

export default DashboardLayout;
