
import { Button } from "@/components/ui/button";
import { Truck, Plus, Printer, CheckCircle, XCircle, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();
  
  const handleNewJob = () => {
    navigate("/qatar/job/new");
  };
  
  return (
    <div className="p-4 bg-[#f8f9fb] border-b border-gray-200 flex flex-col gap-3 mb-6">
      <h3 className="text-lg font-medium text-[#1e2a3a]">QATAR CARGO COLLECTION & DELIVERY MANAGEMENT</h3>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => navigate("/qatar/jobs")} variant="outline" className="bg-white hover:bg-gray-50 border-[#3b5998]/30 text-[#3b5998]">
          VIEW ALL JOBS
        </Button>
        <Button onClick={() => navigate("/qatar/jobs/generate")} variant="outline" className="bg-white hover:bg-gray-50 border-[#3b5998]/30 text-[#3b5998]">
          <Printer className="h-4 w-4 mr-1" />
          JOB SCHEDULE
        </Button>
        <Button 
          className="bg-[#3b5998] hover:bg-[#2d4373] text-white"
          onClick={handleNewJob}
        >
          <Plus className="h-4 w-4 mr-1" />
          NEW JOB
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={() => navigate("/qatar/completed-jobs")}
          variant="outline"
          className="border-[#3b5998]/30 text-[#3b5998] hover:bg-[#3b5998]/5 flex items-center gap-1"
        >
          <CheckCircle size={16} />
          COMPLETED JOBS
        </Button>
        
        <Button 
          onClick={() => navigate("/qatar/cancelled-jobs")}
          variant="outline"
          className="border-red-300 text-red-600 hover:bg-red-50 flex items-center gap-1"
        >
          <XCircle size={16} />
          CANCELLED JOBS
        </Button>
        
        <Button 
          onClick={() => navigate("/qatar/job-status")}
          variant="outline"
          className="border-[#3b5998]/30 text-[#3b5998] hover:bg-[#3b5998]/5 flex items-center gap-1"
        >
          <Activity size={16} />
          JOB STATUS
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
