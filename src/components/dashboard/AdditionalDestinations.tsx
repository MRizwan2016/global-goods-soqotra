
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AdditionalDestinations = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Additional Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-md overflow-hidden bg-amber-500 text-white animate-fade-in shadow-lg hover-scale" style={{animationDelay: "0.3s"}}>
          <div className="p-4">
            <h3 className="text-xl font-bold">Philippines</h3>
            <Link 
              to="/destinations/philippines" 
              className="flex items-center gap-1 text-sm text-white hover:underline mt-1"
            >
              View Details 
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        
        <div className="rounded-md overflow-hidden bg-red-500 text-white animate-fade-in shadow-lg hover-scale" style={{animationDelay: "0.4s"}}>
          <div className="p-4">
            <h3 className="text-xl font-bold">Sri Lanka</h3>
            <Link 
              to="/destinations/sri-lanka" 
              className="flex items-center gap-1 text-sm text-white hover:underline mt-1"
            >
              View Details 
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
        
        <div className="rounded-md overflow-hidden bg-green-500 text-white animate-fade-in shadow-lg hover-scale" style={{animationDelay: "0.5s"}}>
          <div className="p-4">
            <h3 className="text-xl font-bold">Somalia</h3>
            <Link 
              to="/destinations/somalia" 
              className="flex items-center gap-1 text-sm text-white hover:underline mt-1"
            >
              View Details 
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDestinations;
