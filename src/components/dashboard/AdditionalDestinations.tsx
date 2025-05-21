
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AdditionalDestinations = () => {
  return (
    <div className="mb-8 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-700 mb-4 uppercase">ADDITIONAL DESTINATIONS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Replaced Switzerland with Syria */}
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-red-600 transition-all duration-300 hover:shadow-lg">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-3 uppercase">
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm" style={{ 
              background: "linear-gradient(to bottom, #CE1126 33%, #FFFFFF 33%, #FFFFFF 66%, #000000 66%)"
            }}>
            </div>
            <span className="text-red-700">SYRIA</span>
          </h2>
          <Link 
            to="/syria" 
            className="destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase"
          >
            VIEW DETAILS 
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        {/* Replaced Senegal with Saudi Arabia */}
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-green-600 transition-all duration-300 hover:shadow-lg">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-3 uppercase">
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm" style={{ 
              background: "#006C35",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "70%",
                textAlign: "center",
                color: "white",
                fontSize: "7px",
                fontWeight: "bold"
              }}>سعودي</div>
            </div>
            <span className="text-green-700">SAUDI ARABIA</span>
          </h2>
          <Link 
            to="/saudi-arabia" 
            className="destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase"
          >
            VIEW DETAILS 
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        {/* Replaced Botswana with Ethiopia */}
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-yellow-600 transition-all duration-300 hover:shadow-lg">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-3 uppercase">
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm" style={{ 
              background: "linear-gradient(to bottom, #078930 33%, #FCDD09 33%, #FCDD09 66%, #DA121A 66%)",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "30%",
                height: "30%",
                borderRadius: "50%",
                background: "#0F47AF"
              }}></div>
            </div>
            <span className="text-yellow-700">ETHIOPIA</span>
          </h2>
          <Link 
            to="/ethiopia" 
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
