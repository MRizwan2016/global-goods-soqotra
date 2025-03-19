
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, Search, Truck } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">QATAR OPERATIONS</h1>
        <p className="text-gray-500">CARGO COLLECTION AND DELIVERY MANAGEMENT</p>
      </div>
      
      <div className="flex gap-2 mt-3 md:mt-0">
        <Link to="/qatar/jobs">
          <Button variant="outline" className="gap-1">
            VIEW ALL JOBS
            <ArrowRight size={16} />
          </Button>
        </Link>
        <Link to="/qatar/job/new">
          <Button className="gap-1 bg-blue-600 hover:bg-blue-700">
            ADD NEW JOB
            <Plus size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
