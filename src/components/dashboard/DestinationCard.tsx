
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface DestinationCardProps {
  country: string;
  bgColor: string;
  borderColor?: string;
  to: string;
  flagEmoji?: string;
}

const DestinationCard = ({ country, bgColor, borderColor = "", to, flagEmoji }: DestinationCardProps) => {
  const { language, t } = useLanguage();
  
  const getFlagClass = (country: string) => {
    const countryLower = country.toLowerCase();
    return `flag-${countryLower.replace(/\s+/g, "-")}`;
  };

  return (
    <Link to={to} className="block group">
      <div className="
        bg-white rounded-xl border border-gray-200 p-5
        shadow-sm transition-all duration-300 ease-out
        hover:shadow-lg hover:border-[#3b5998]/30 hover:-translate-y-1
        cursor-pointer relative overflow-hidden
      ">
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 group-hover:to-blue-50/30 transition-colors duration-300" />
        
        <div className={`relative flex items-center gap-3 mb-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          {/* Flag container */}
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:shadow-md transition-shadow duration-300 overflow-hidden">
            {flagEmoji ? (
              <span className="text-3xl leading-none">{flagEmoji}</span>
            ) : (
              <span className={`flag-icon ${getFlagClass(country)} transform transition-transform duration-300 group-hover:scale-110`} style={{ width: '32px', height: '32px', borderRadius: '4px' }}></span>
            )}
          </div>
          <h3 className={`text-base font-bold text-[#1e2a3a] ${language === 'ar' ? 'font-arabic' : ''}`}>
            {country}
          </h3>
        </div>
        
        <div className={`
          relative flex items-center gap-1.5 text-[#3b5998] 
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
