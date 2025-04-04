
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PrimaryDestinations = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Primary Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Kenya Card */}
        <div className="kenya-card destination-card animate-fade-in shadow-lg hover-scale">
          <h2>Kenya</h2>
          <Link 
            to="/kenya" 
            className="destination-card-link"
          >
            View Details 
            <ArrowRight size={16} />
          </Link>
        </div>
        
        {/* Tunisia Card */}
        <div className="tunisia-card destination-card animate-fade-in shadow-lg hover-scale" style={{animationDelay: "0.1s"}}>
          <h2>Tunisia</h2>
          <Link 
            to="/destinations/tunisia" 
            className="destination-card-link"
          >
            View Details 
            <ArrowRight size={16} />
          </Link>
        </div>
        
        {/* Uganda Card */}
        <div className="uganda-card destination-card animate-fade-in shadow-lg hover-scale" style={{animationDelay: "0.2s"}}>
          <h2>Uganda</h2>
          <Link 
            to="/destinations/uganda" 
            className="destination-card-link"
          >
            View Details 
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrimaryDestinations;
