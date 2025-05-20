
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AdditionalDestinations = () => {
  return (
    <div className="mb-8 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 uppercase">ADDITIONAL DESTINATIONS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* We've removed the Philippines, Tunisia, and Somalia cards as they are already in Primary Destinations */}
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-yellow-600 transition-all duration-300 hover:shadow-lg">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-3 uppercase">
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm" style={{ 
              background: "#DA291C",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "30%",
                height: "60%",
                background: "white"
              }}></div>
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotate(90deg)",
                width: "30%",
                height: "60%",
                background: "white"
              }}></div>
            </div>
            <span className="text-amber-700">SWITZERLAND</span>
          </h2>
          <Link 
            to="/switzerland" 
            className="destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase"
          >
            VIEW DETAILS 
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-emerald-600 transition-all duration-300 hover:shadow-lg">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-3 uppercase">
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm" style={{ 
              background: "linear-gradient(to bottom, #008751 33%, #FCD116 33%, #FCD116 66%, #CE1126 66%)"
            }}>
            </div>
            <span className="text-emerald-700">SENEGAL</span>
          </h2>
          <Link 
            to="/senegal" 
            className="destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase"
          >
            VIEW DETAILS 
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-cyan-600 transition-all duration-300 hover:shadow-lg">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-3 uppercase">
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm" style={{ 
              background: "#0072C6"
            }}>
            </div>
            <span className="text-cyan-700">BOTSWANA</span>
          </h2>
          <Link 
            to="/botswana" 
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
