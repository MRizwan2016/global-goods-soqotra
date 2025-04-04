
import { Link } from "react-router-dom";
import { ArrowRight, Flag } from "lucide-react";

const PrimaryDestinations = () => {
  return (
    <div className="mb-8 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 uppercase">PRIMARY DESTINATIONS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kenya Card */}
        <div className="destination-card hover-scale">
          <h2>
            <span className="flag-icon flag-kenya">
              <Flag size={16} />
            </span>
            KENYA
          </h2>
          <Link 
            to="/kenya" 
            className="destination-card-link"
          >
            VIEW DETAILS 
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        {/* Tunisia Card */}
        <div className="destination-card hover-scale">
          <h2>
            <span className="flag-icon flag-tunisia">
              <Flag size={16} />
            </span>
            TUNISIA
          </h2>
          <Link 
            to="/destinations/tunisia" 
            className="destination-card-link"
          >
            VIEW DETAILS 
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        {/* Uganda Card */}
        <div className="destination-card hover-scale">
          <h2>
            <span className="flag-icon flag-uganda">
              <Flag size={16} />
            </span>
            UGANDA
          </h2>
          <Link 
            to="/destinations/uganda" 
            className="destination-card-link"
          >
            VIEW DETAILS 
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrimaryDestinations;
