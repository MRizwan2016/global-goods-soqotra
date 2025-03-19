
import React from "react";
import { Truck, Calendar } from "lucide-react";

interface JobGenerateHeaderProps {
  title: string;
}

const JobGenerateHeader: React.FC<JobGenerateHeaderProps> = ({ title }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-lg mb-6 shadow-md animate-fade-in">
      <div className="flex items-center space-x-3">
        <div className="bg-white/20 p-3 rounded-full">
          <Truck size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-blue-100 flex items-center">
            <Calendar size={14} className="mr-1" />
            Create and manage job schedules for your vehicles and drivers
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobGenerateHeader;
