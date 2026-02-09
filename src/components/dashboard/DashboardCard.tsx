
import { ReactNode } from 'react';

interface DashboardCardProps {
  children: ReactNode;
}

const DashboardCard = ({ children }: DashboardCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6 transition-all hover:shadow-md animate-fade-in">
      {children}
    </div>
  );
};

export default DashboardCard;
