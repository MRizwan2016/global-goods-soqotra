
import { Link } from "react-router-dom";
import { ArrowRight, Flag } from "lucide-react";

const PrimaryDestinations = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Primary Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kenya Card */}
        <div className="destination-card">
          <h2>
            <span className="flag-icon flag-kenya">
              <Flag size={14} />
            </span>
            Kenya
          </h2>
          <Link 
            to="/kenya" 
            className="destination-card-link"
          >
            View Details 
            <ArrowRight size={16} />
          </Link>
        </div>
        
        {/* Tunisia Card */}
        <div className="destination-card">
          <h2>
            <span className="flag-icon flag-tunisia">
              <Flag size={14} />
            </span>
            Tunisia
          </h2>
          <Link 
            to="/destinations/tunisia" 
            className="destination-card-link"
          >
            View Details 
            <ArrowRight size={16} />
          </Link>
        </div>
        
        {/* Uganda Card */}
        <div className="destination-card">
          <h2>
            <span className="flag-icon flag-uganda">
              <Flag size={14} />
            </span>
            Uganda
          </h2>
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
