
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface JobListHeaderProps {
  title: string;
}

const JobListHeader: React.FC<JobListHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Button 
        onClick={() => navigate("/qatar/new")} 
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Create New Job
      </Button>
    </div>
  );
};

export default JobListHeader;
