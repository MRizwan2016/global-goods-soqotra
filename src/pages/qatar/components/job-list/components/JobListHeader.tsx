
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

interface JobListHeaderProps {
  title: string;
}

const JobListHeader: React.FC<JobListHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Button 
        onClick={() => navigate("/qatar/job/new")} 
        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Create New Job
      </Button>
    </div>
  );
};

export default JobListHeader;
