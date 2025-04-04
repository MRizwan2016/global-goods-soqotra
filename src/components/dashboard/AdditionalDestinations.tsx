
import { Link } from "react-router-dom";
import { ArrowRight, Flag } from "lucide-react";

const AdditionalDestinations = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Additional Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="destination-card">
          <h2>
            <span className="flag-icon flag-philippines">
              <Flag size={14} />
            </span>
            Philippines
          </h2>
          <Link 
            to="/destinations/philippines" 
            className="destination-card-link"
          >
            View Details 
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="destination-card">
          <h2>
            <span className="flag-icon flag-srilanka">
              <Flag size={14} />
            </span>
            Sri Lanka
          </h2>
          <Link 
            to="/destinations/sri-lanka" 
            className="destination-card-link"
          >
            View Details 
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="destination-card">
          <h2>
            <span className="flag-icon flag-somalia">
              <Flag size={14} />
            </span>
            Somalia
          </h2>
          <Link 
            to="/destinations/somalia" 
            className="destination-card-link"
          >
            View Details 
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDestinations;
