
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface DestinationCardProps {
  country: string;
  bgColor: string;
  borderColor?: string;
  to: string;
}

const DestinationCard = ({ country, bgColor, borderColor = "", to }: DestinationCardProps) => {
  const { language, t } = useLanguage();
  
  // Function to determine the appropriate flag class based on country
  const getFlagClass = (country: string) => {
    const countryLower = country.toLowerCase();
    // Convert "Sri Lanka" to "sri-lanka" for the CSS class
    return `flag-${countryLower.replace(/\s+/g, "-")}`;
  };

  return (
    <div className={`relative group`}>
      {/* Circular container with gradient background */}
      <div className={`
        rounded-3xl p-6 bg-gradient-to-br ${bgColor} 
        border-2 ${borderColor} shadow-lg
        transform transition-all duration-500 ease-out
        hover:scale-105 hover:shadow-2xl hover:rotate-1
        cursor-pointer group-hover:bg-opacity-90
        ${language === 'ar' ? 'flex-row-reverse' : ''}
      `}>
        {/* Flag and country name */}
        <div className={`flex items-center gap-3 mb-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className="relative">
            <span className={`flag-icon ${getFlagClass(country.toLowerCase())} transform transition-transform duration-300 group-hover:scale-110`}></span>
            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-125 transition-transform duration-300"></div>
          </div>
          <h3 className={`text-lg font-bold text-white drop-shadow-lg ${language === 'ar' ? 'font-arabic' : ''}`}>
            {country}
          </h3>
        </div>
        
        {/* View details link */}
        <Link 
          to={to} 
          className={`
            flex items-center gap-2 text-white/90 hover:text-white 
            font-medium text-sm transition-all duration-300
            group-hover:translate-x-2 ${language === 'ar' ? 'font-arabic flex-row-reverse group-hover:-translate-x-2' : ''}
          `}
        >
          {t("dashboard.viewDetails")}
          {language === "ar" ? (
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 rotate-180" />
          ) : (
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </Link>
      </div>
      
      {/* Animated glow effect */}
      <div className={`
        absolute inset-0 rounded-3xl bg-gradient-to-br ${bgColor} 
        opacity-0 group-hover:opacity-30 blur-xl
        transition-opacity duration-500 -z-10
      `}></div>
    </div>
  );
};

export default DestinationCard;
