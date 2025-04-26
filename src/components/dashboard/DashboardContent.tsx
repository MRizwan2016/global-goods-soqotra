
import React, { ReactNode } from 'react';
import SearchInvoiceButton from './SearchInvoiceButton';

interface DashboardContentProps {
  children: ReactNode;
  isLoaded: boolean;
}

const DashboardContent = ({ children, isLoaded }: DashboardContentProps) => {
  return (
    <div className={`p-6 transition-opacity duration-500 relative z-10 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
          <SearchInvoiceButton />
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardContent;
