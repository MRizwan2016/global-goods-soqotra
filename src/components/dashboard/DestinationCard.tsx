
import { ArrowRight, Globe } from "lucide-react";
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
  
  const getFlagClass = (country: string) => {
    const countryLower = country.toLowerCase();
    return `flag-${countryLower.replace(/\s+/g, "-")}`;
  };

  return (
    <Link to={to} className="block group">
      <div className="
        bg-white rounded-lg border border-gray-200 p-5
        shadow-sm transition-all duration-300 ease-out
        hover:shadow-md hover:border-[#3b5998]/30 hover:-translate-y-0.5
        cursor-pointer
      ">
        <div className={`flex items-center gap-3 mb-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-[#1e2a3a]/5 flex items-center justify-center flex-shrink-0">
            <span className={`flag-icon ${getFlagClass(country.toLowerCase())} transform transition-transform duration-300 group-hover:scale-110`}></span>
          </div>
          <h3 className={`text-base font-semibold text-[#1e2a3a] ${language === 'ar' ? 'font-arabic' : ''}`}>
            {country}
          </h3>
        </div>
        
        <div className={`
          flex items-center gap-1.5 text-[#3b5998] 
          font-medium text-sm transition-all duration-300
          group-hover:gap-2.5 ${language === 'ar' ? 'font-arabic flex-row-reverse' : ''}
        `}>
          {t("dashboard.viewDetails")}
          {language === "ar" ? (
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 rotate-180" />
          ) : (
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
