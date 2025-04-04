
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PrimaryDestinations = () => {
  return (
    <div className="mb-8 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 uppercase">PRIMARY DESTINATIONS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Kenya Card */}
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-green-600 transition-all duration-300 hover:shadow-lg">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-3 uppercase">
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm" style={{ background: "linear-gradient(to bottom, #000000 33%, #FFFFFF 33%, #FFFFFF 66%, #009A49 66%)" }}>
            </div>
            KENYA
          </h2>
          <Link 
            to="/kenya" 
            className="destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase"
          >
            VIEW DETAILS 
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        {/* Tunisia Card */}
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-red-600 transition-all duration-300 hover:shadow-lg">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-3 uppercase">
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm" style={{ background: "#E70013" }}>
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white border-2 border-red-600"></div>
              </div>
            </div>
            TUNISIA
          </h2>
          <Link 
            to="/destinations/tunisia" 
            className="destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase"
          >
            VIEW DETAILS 
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        {/* Uganda Card */}
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-yellow-500 transition-all duration-300 hover:shadow-lg">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-3 uppercase">
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm" style={{ background: "linear-gradient(to bottom, #000000 33%, #FCDC04 33%, #FCDC04 66%, #D90000 66%)" }}>
            </div>
            UGANDA
          </h2>
          <Link 
            to="/destinations/uganda" 
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

export default PrimaryDestinations;
