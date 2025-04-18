
import { ReactNode } from 'react';

interface DashboardCardProps {
  children: ReactNode;
}

const DashboardCard = ({ children }: DashboardCardProps) => {
  return (
    <div className="glass p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      {children}
    </div>
  );
};

export default DashboardCard;
