
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, CarFront, UserRoundCog, Search, FileText, Calendar } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1e2a3a]">Kenya Operations</h1>
        <p className="text-gray-500">Cargo collection and delivery management</p>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
        <Link to="/kenya/invoices">
          <Button variant="outline" className="flex items-center gap-1 border-[#3b5998]/30 text-[#3b5998] hover:bg-[#3b5998]/5">
            <FileText size={16} />
            Invoices
          </Button>
        </Link>
        
        <Link to="/kenya/schedules">
          <Button variant="outline" className="flex items-center gap-1 border-[#3b5998]/30 text-[#3b5998] hover:bg-[#3b5998]/5">
            <Calendar size={16} />
            Schedules
          </Button>
        </Link>
        
        <Link to="/kenya/customer-portal">
          <Button variant="outline" className="flex items-center gap-1 border-[#3b5998]/30 text-[#3b5998] hover:bg-[#3b5998]/5">
            <Search size={16} />
            Customer Portal
          </Button>
        </Link>
        
        <Link to="/kenya/vehicles">
          <Button variant="outline" className="flex items-center gap-1 border-[#3b5998]/30 text-[#3b5998] hover:bg-[#3b5998]/5">
            <CarFront size={16} />
            Manage Vehicles
          </Button>
        </Link>
        
        <Link to="/kenya/drivers">
          <Button variant="outline" className="flex items-center gap-1 border-[#3b5998]/30 text-[#3b5998] hover:bg-[#3b5998]/5">
            <UserRoundCog size={16} />
            Manage Drivers
          </Button>
        </Link>
        
        <Link to="/kenya/deliveries">
          <Button variant="outline" className="flex items-center gap-1 border-[#3b5998]/30 text-[#3b5998] hover:bg-[#3b5998]/5">
            View All Deliveries
            <ArrowRight size={16} />
          </Button>
        </Link>
        
        <Link to="/kenya/delivery/new">
          <Button className="gap-1 bg-[#3b5998] hover:bg-[#2d4373]">
            New Delivery
            <Package size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
