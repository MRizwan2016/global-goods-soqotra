
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface DestinationCardProps {
  country: string;
  bgColor: string;
  to: string;
}

const DestinationCard = ({ country, bgColor, to }: DestinationCardProps) => {
  const { language, t } = useLanguage();
  
  // Function to determine the appropriate flag class based on country
  const getFlagClass = (country: string) => {
    const countryLower = country.toLowerCase();
    // Convert "Sri Lanka" to "sri-lanka" for the CSS class
    return `flag-${countryLower.replace(/\s+/g, "-")}`;
  };

  return (
    <div className={`glass rounded-lg p-5 ${bgColor} flex justify-between items-center card-hover ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
      <h3 className={`text-xl font-semibold text-gray-800 flex items-center gap-2 ${language === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}>
        <span className={`flag-icon ${getFlagClass(country.toLowerCase())}`}></span>
        {country}
      </h3>
      <Link 
        to={to} 
        className={`flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300 ${language === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}
      >
        {t("dashboard.viewDetails")}
        {language === "ar" ? (
          <ArrowRight className="w-4 h-4 animate-slide-in rotate-180 mr-1" />
        ) : (
          <ArrowRight className="w-4 h-4 animate-slide-in ml-1" />
        )}
      </Link>
    </div>
  );
};

export default DestinationCard;
