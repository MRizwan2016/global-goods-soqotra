
import { ReactNode } from 'react';

interface DashboardCardProps {
  children: ReactNode;
}

const DashboardCard = ({ children }: DashboardCardProps) => {
  return (
    <div className="glass bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl shadow-md p-6 mb-6 transition-all hover:shadow-lg animate-fade-in">
      {children}
    </div>
  );
};

export default DashboardCard;
