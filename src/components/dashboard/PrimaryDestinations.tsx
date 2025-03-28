
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PrimaryDestinations = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Primary Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Kenya Card */}
        <div className="rounded-md overflow-hidden bg-blue-600 text-white animate-fade-in shadow-lg hover-scale">
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4">Kenya</h3>
            <Link 
              to="/kenya" 
              className="flex items-center gap-1 text-white hover:underline"
            >
              View Details 
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        
        {/* Tunisia Card */}
        <div className="rounded-md overflow-hidden bg-red-600 text-white animate-fade-in shadow-lg hover-scale" style={{animationDelay: "0.1s"}}>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4">Tunisia</h3>
            <Link 
              to="/destinations/tunisia" 
              className="flex items-center gap-1 text-white hover:underline"
            >
              View Details 
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        
        {/* Uganda Card */}
        <div className="rounded-md overflow-hidden bg-green-600 text-white animate-fade-in shadow-lg hover-scale" style={{animationDelay: "0.2s"}}>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4">Uganda</h3>
            <Link 
              to="/destinations/uganda" 
              className="flex items-center gap-1 text-white hover:underline"
            >
              View Details 
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryDestinations;
