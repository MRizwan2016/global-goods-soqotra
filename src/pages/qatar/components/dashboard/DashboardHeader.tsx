
import { Button } from "@/components/ui/button";
import { Truck, Plus, Printer, CheckCircle, XCircle, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();
  
  const handleNewJob = () => {
    navigate("/qatar/job/new");
  };
  
  return (
    <div className="p-4 bg-blue-50 border-b border-blue-100 flex flex-col gap-3">
      <h3 className="text-lg font-medium text-blue-800">QATAR CARGO COLLECTION & DELIVERY MANAGEMENT</h3>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => navigate("/qatar/jobs")} variant="outline" className="bg-white hover:bg-gray-50">
          VIEW ALL JOBS
        </Button>
        <Button onClick={() => navigate("/qatar/jobs/generate")} variant="outline" className="bg-white hover:bg-gray-50">
          <Printer className="h-4 w-4 mr-1" />
          JOB SCHEDULE
        </Button>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleNewJob}
        >
          <Plus className="h-4 w-4 mr-1" />
          NEW JOB
        </Button>
      </div>
      
      {/* Report buttons section */}
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={() => navigate("/qatar/completed-jobs")}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 transition-all hover:scale-105"
        >
          <CheckCircle size={16} />
          COMPLETED JOBS
        </Button>
        
        <Button 
          onClick={() => navigate("/qatar/cancelled-jobs")}
          className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1 transition-all hover:scale-105"
        >
          <XCircle size={16} />
          CANCELLED JOBS
        </Button>
        
        <Button 
          onClick={() => navigate("/qatar/job-status")}
          className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1 transition-all hover:scale-105"
        >
          <Activity size={16} />
          JOB STATUS
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
