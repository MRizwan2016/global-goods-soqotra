
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
            to="/philippines" 
            className="destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase"
          >
            VIEW DETAILS 
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-red-600 transition-all duration-300 hover:shadow-lg">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-3 uppercase">
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm" style={{ 
              background: "#E70013",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "60%",
                height: "60%",
                borderRadius: "50%",
                background: "white"
              }}></div>
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "45%",
                height: "45%",
                borderRadius: "50%",
                background: "#E70013"
              }}></div>
              <div style={{
                position: "absolute",
                top: "35%",
                left: "55%",
                transform: "translate(-50%, -50%) rotate(45deg)",
                width: "25%",
                height: "25%",
                background: "white",
                clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
              }}></div>
            </div>
            <span className="text-red-700">TUNISIA</span>
          </h2>
          <Link 
            to="/tunisia" 
            className="destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase"
          >
            VIEW DETAILS 
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-3 uppercase">
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm">
              <img 
                src="/lovable-uploads/21983d88-cc3a-4e15-9432-668dc66e43c3.png" 
                alt="Somalia Flag" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-blue-700">SOMALIA</span>
          </h2>
          <Link 
            to="/somalia" 
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
