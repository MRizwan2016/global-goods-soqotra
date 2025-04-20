
import React, { ReactNode } from 'react';
import DashboardCard from './DashboardCard';
import ShipmentAnalytics from './ShipmentAnalytics';
import PrimaryDestinations from './PrimaryDestinations';
import AdditionalDestinations from './AdditionalDestinations';
import ShipmentTable from './ShipmentTable';
import SearchInvoiceButton from './SearchInvoiceButton';

interface DashboardLayoutProps {
  children: ReactNode;
  isLoaded: boolean;
}

const DashboardLayout = ({ children, isLoaded }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F8FF] to-white">
      <div className={`p-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
            <SearchInvoiceButton />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
