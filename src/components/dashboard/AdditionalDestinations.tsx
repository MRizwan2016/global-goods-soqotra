
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AdditionalDestinations = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Additional Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="philippines-card destination-card animate-fade-in shadow-lg hover-scale" style={{animationDelay: "0.3s"}}>
          <h2>Philippines</h2>
          <Link 
            to="/destinations/philippines" 
            className="destination-card-link"
          >
            View Details 
            <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="srilanka-card destination-card animate-fade-in shadow-lg hover-scale" style={{animationDelay: "0.4s"}}>
          <h2>Sri Lanka</h2>
          <Link 
            to="/destinations/sri-lanka" 
            className="destination-card-link"
          >
            View Details 
            <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="somalia-card destination-card animate-fade-in shadow-lg hover-scale" style={{animationDelay: "0.5s"}}>
          <h2>Somalia</h2>
          <Link 
            to="/destinations/somalia" 
            className="destination-card-link"
          >
            View Details 
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDestinations;
