
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobPageHeader = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate("/qatar")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <div className="bg-blue-600 text-white p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-medium mb-2">Soqotra Logistics - Job Schedule</h1>
        <p className="text-blue-100">Create and manage job schedules for your vehicles and drivers</p>
      </div>
    </>
  );
};

export default JobPageHeader;
