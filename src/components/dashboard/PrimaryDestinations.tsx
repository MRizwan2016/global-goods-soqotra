
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
            <span className="text-green-700">KENYA</span>
          </h2>
          <Link 
            to="/kenya" 
            className="destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase"
          >
            VIEW DETAILS 
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        {/* Sri Lanka Card */}
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-yellow-600 transition-all duration-300 hover:shadow-lg">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-3 uppercase">
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm">
              <img 
                src="/lovable-uploads/ed0f9d99-06bf-411d-b01d-77800d19a00f.png" 
                alt="Sri Lanka Flag" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-amber-700">SRI LANKA</span>
          </h2>
          <Link 
            to="/destinations/sri-lanka" 
            className="destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase"
          >
            VIEW DETAILS 
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        {/* Uganda Card (updating link to our new dedicated page) */}
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-red-600 transition-all duration-300 hover:shadow-lg">
          <h2 className="flex items-center gap-2 font-semibold text-lg mb-3 uppercase">
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm" style={{ 
              background: "linear-gradient(to bottom, #000000 33%, #FFFF00 33%, #FFFF00 66%, #DE0000 66%)"
            }}>
            </div>
            <span className="text-red-700">UGANDA</span>
          </h2>
          <Link 
            to="/uganda" 
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
