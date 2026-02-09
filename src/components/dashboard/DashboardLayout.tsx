
import React, { ReactNode } from 'react';
import BackgroundOverlay from './BackgroundOverlay';
import DashboardContent from './DashboardContent';
import WaveBackground from './WaveBackground';

interface DashboardLayoutProps {
  children: ReactNode;
  isLoaded: boolean;
}

const DashboardLayout = ({ children, isLoaded }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#f8f9fb] relative overflow-hidden">
      <BackgroundOverlay />
      <WaveBackground />
      <DashboardContent isLoaded={isLoaded}>
        {children}
      </DashboardContent>
    </div>
  );
};

export default DashboardLayout;
