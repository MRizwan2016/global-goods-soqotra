
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, CarFront, UserRoundCog } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Kenya Operations</h1>
        <p className="text-gray-500">Cargo collection and delivery management</p>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
        <Link to="/kenya/vehicles">
          <Button variant="outline" className="flex items-center gap-1">
            <CarFront size={16} />
            Manage Vehicles
          </Button>
        </Link>
        
        <Link to="/kenya/drivers">
          <Button variant="outline" className="flex items-center gap-1">
            <UserRoundCog size={16} />
            Manage Drivers
          </Button>
        </Link>
        
        <Link to="/kenya/deliveries">
          <Button variant="outline" className="flex items-center gap-1">
            View All Deliveries
            <ArrowRight size={16} />
          </Button>
        </Link>
        
        <Link to="/kenya/delivery/new">
          <Button className="gap-1 bg-green-600 hover:bg-green-700">
            New Delivery
            <Package size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
