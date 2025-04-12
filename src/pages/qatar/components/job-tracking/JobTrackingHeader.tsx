
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Truck, User, Plus, Printer, FileText, CheckCircle, XCircle, Activity } from "lucide-react";

const JobTrackingHeader = () => {
  const navigate = useNavigate();
  
  const handleNewJob = () => {
    navigate("/qatar/job/new");
  };
  
  const handleJobGenerate = () => {
    navigate("/qatar/jobs/generate");
  };
  
  const handleManageVehicles = () => {
    navigate("/qatar/vehicles");
  };

  const handleCompletedJobs = () => {
    navigate("/qatar/completed-jobs");
  };

  const handleCancelledJobs = () => {
    navigate("/qatar/cancelled-jobs");
  };

  const handleJobStatus = () => {
    navigate("/qatar/job-status");
  };
  
  return (
    <div className="p-4 bg-blue-50 border-b border-blue-100 flex flex-col gap-3">
      <h3 className="text-lg font-medium text-blue-800">QATAR CARGO COLLECTION & DELIVERY MANAGEMENT</h3>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={handleJobGenerate}
        >
          <Printer size={14} />
          JOB GENERATE
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={handleManageVehicles}
        >
          <Truck size={14} />
          MANAGE VEHICLES
        </Button>
        <Button variant="outline" className="flex items-center gap-1" onClick={() => navigate("/qatar/drivers")}>
          <User size={14} />
          MANAGE DRIVERS
        </Button>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
          onClick={handleNewJob}
        >
          <Plus size={14} />
          ADD NEW JOB
        </Button>
      </div>
      
      {/* Report buttons section */}
      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={handleCompletedJobs}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1 transition-all hover:scale-105"
        >
          <CheckCircle size={16} />
          COMPLETED JOBS
        </Button>
        
        <Button 
          onClick={handleCancelledJobs}
          className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1 transition-all hover:scale-105"
        >
          <XCircle size={16} />
          CANCELLED JOBS
        </Button>
        
        <Button 
          onClick={handleJobStatus}
          className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1 transition-all hover:scale-105"
        >
          <Activity size={16} />
          JOB STATUS
        </Button>
      </div>
    </div>
  );
};

export default JobTrackingHeader;
