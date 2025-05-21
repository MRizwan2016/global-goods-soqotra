
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface DestinationCardProps {
  country: string;
  bgColor: string;
  to: string;
}

const DestinationCard = ({ country, bgColor, to }: DestinationCardProps) => {
  // Function to determine the appropriate flag class based on country
  const getFlagClass = (country: string) => {
    const countryLower = country.toLowerCase();
    // Convert "Sri Lanka" to "sri-lanka" for the CSS class
    return `flag-${countryLower.replace(/\s+/g, "-")}`;
  };

  return (
    <div className={`glass rounded-lg p-5 ${bgColor} flex justify-between items-center card-hover`}>
      <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <span className={`flag-icon ${getFlagClass(country)}`}></span>
        {country}
      </h3>
      <Link 
        to={to} 
        className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300"
      >
        View Details 
        <ArrowRight className="w-4 h-4 animate-slide-in" />
      </Link>
    </div>
  );
};

export default DestinationCard;
