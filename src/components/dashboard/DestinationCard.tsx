
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface DestinationCardProps {
  country: string;
  bgColor: string;
  to: string;
}

const DestinationCard = ({ country, bgColor, to }: DestinationCardProps) => {
  return (
    <div className={`rounded-md p-5 ${bgColor} text-white flex justify-between items-center`}>
      <h3 className="text-xl font-semibold">{country}</h3>
      <Link 
        to={to} 
        className="flex items-center gap-1 text-sm font-medium hover:underline"
      >
        View Details 
        <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default DestinationCard;
