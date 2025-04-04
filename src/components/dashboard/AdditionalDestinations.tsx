
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AdditionalDestinations = () => {
  return (
    <div className="mb-8 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 uppercase">ADDITIONAL DESTINATIONS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-blue-600 transition-all duration-300 hover:shadow-lg">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-3 uppercase">
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm" style={{ background: "linear-gradient(to right, #0038A8 33%, #FFFFFF 33%, #FFFFFF 66%, #CE1126 66%)" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-yellow-500 text-xs">★</div>
              </div>
            </div>
            PHILIPPINES
          </h2>
          <Link 
            to="/destinations/philippines" 
            className="destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase"
          >
            VIEW DETAILS 
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-yellow-600 transition-all duration-300 hover:shadow-lg">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-3 uppercase">
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm" style={{ 
              background: "#FFBE29",
              backgroundImage: "linear-gradient(to right, #FF4E12 0%, #FF4E12 64%, #FFBE29 64%, #FFBE29 100%)"
            }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-4 bg-green-600"></div>
              </div>
            </div>
            SRI LANKA
          </h2>
          <Link 
            to="/destinations/sri-lanka" 
            className="destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase"
          >
            VIEW DETAILS 
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-3 uppercase">
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm" style={{ 
              background: "linear-gradient(to bottom, #75AADB 50%, #FFFFFF 50%)",
            }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white" style={{ fontSize: '10px' }}>★</div>
              </div>
            </div>
            SOMALIA
          </h2>
          <Link 
            to="/destinations/somalia" 
            className="destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase"
          >
            VIEW DETAILS 
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDestinations;
