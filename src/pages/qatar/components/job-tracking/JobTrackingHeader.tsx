
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Truck, User, Plus, Printer, FileText } from "lucide-react";

const JobTrackingHeader = () => {
  const navigate = useNavigate();
  
  const handlePrintJobs = () => {
    // Open the print page in a new window
    window.open("/qatar/jobs/print", "_blank");
  };
  
  return (
    <div className="p-4 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
      <h3 className="text-lg font-medium text-blue-800">QATAR CARGO COLLECTION & DELIVERY MANAGEMENT</h3>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={handlePrintJobs}
        >
          <Printer size={14} />
          JOB GENERATE
        </Button>
        <Button variant="outline" className="flex items-center gap-1">
          <Truck size={14} />
          MANAGE VEHICLES
        </Button>
        <Button variant="outline" className="flex items-center gap-1">
          <User size={14} />
          MANAGE DRIVERS
        </Button>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
          onClick={() => navigate("/qatar/job/new")}
        >
          <Plus size={14} />
          ADD NEW JOB
        </Button>
      </div>
    </div>
  );
};

export default JobTrackingHeader;
