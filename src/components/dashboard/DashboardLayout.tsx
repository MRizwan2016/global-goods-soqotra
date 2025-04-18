
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
  isLoaded: boolean;
}

const DashboardLayout = ({ children, isLoaded }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F8FF] to-white">
      <div className={`p-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="space-y-6 animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
