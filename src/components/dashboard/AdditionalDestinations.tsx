
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AdditionalDestinations = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="mb-8 animate-fade-in">
      <h2 className={`text-xl font-semibold text-gray-700 mb-4 uppercase ${language === 'ar' ? 'font-arabic' : ''}`}>
        {t("dashboard.additionalDestinations")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Syria */}
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-red-600 transition-all duration-300 hover:shadow-lg">
          <h2 className={`flex items-center gap-2 font-semibold text-lg mb-3 uppercase ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm flag-icon flag-syria"></div>
            <span className={`text-red-700 ${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.syria")}</span>
          </h2>
          <Link 
            to="/syria" 
            className={`destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase ${language === 'ar' ? 'flex-row-reverse font-arabic' : ''}`}
          >
            {language === 'ar' && <ArrowLeft size={16} className="ml-1 transition-transform group-hover:-translate-x-1" />}
            {t("dashboard.viewDetails")}
            {language === 'en' && <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />}
          </Link>
        </div>
        
        {/* Saudi Arabia */}
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-green-600 transition-all duration-300 hover:shadow-lg">
          <h2 className={`flex items-center gap-2 font-semibold text-lg mb-3 uppercase ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm flag-icon flag-saudi-arabia"></div>
            <span className={`text-green-700 ${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.saudiArabia")}</span>
          </h2>
          <Link 
            to="/saudi-arabia" 
            className={`destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase ${language === 'ar' ? 'flex-row-reverse font-arabic' : ''}`}
          >
            {language === 'ar' && <ArrowLeft size={16} className="ml-1 transition-transform group-hover:-translate-x-1" />}
            {t("dashboard.viewDetails")}
            {language === 'en' && <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />}
          </Link>
        </div>
        
        {/* Ethiopia */}
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-yellow-600 transition-all duration-300 hover:shadow-lg">
          <h2 className={`flex items-center gap-2 font-semibold text-lg mb-3 uppercase ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm flag-icon flag-ethiopia"></div>
            <span className={`text-yellow-700 ${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.ethiopia")}</span>
          </h2>
          <Link 
            to="/ethiopia" 
            className={`destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase ${language === 'ar' ? 'flex-row-reverse font-arabic' : ''}`}
          >
            {language === 'ar' && <ArrowLeft size={16} className="ml-1 transition-transform group-hover:-translate-x-1" />}
            {t("dashboard.viewDetails")}
            {language === 'en' && <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />}
          </Link>
        </div>
        
        {/* Sudan - Updated */}
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-blue-600 transition-all duration-300 hover:shadow-lg">
          <h2 className={`flex items-center gap-2 font-semibold text-lg mb-3 uppercase ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm flag-icon flag-sudan"></div>
            <span className={`text-blue-700 ${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.sudan")}</span>
          </h2>
          <Link 
            to="/sudan" 
            className={`destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase ${language === 'ar' ? 'flex-row-reverse font-arabic' : ''}`}
          >
            {language === 'ar' && <ArrowLeft size={16} className="ml-1 transition-transform group-hover:-translate-x-1" />}
            {t("dashboard.viewDetails")}
            {language === 'en' && <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />}
          </Link>
        </div>
        
        {/* Eritrea - Updated */}
        <div className="destination-card hover-scale bg-white shadow-md rounded-lg p-5 border-l-4 border-purple-600 transition-all duration-300 hover:shadow-lg">
          <h2 className={`flex items-center gap-2 font-semibold text-lg mb-3 uppercase ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-5 flex-shrink-0 rounded overflow-hidden shadow-sm flag-icon flag-eritrea"></div>
            <span className={`text-purple-700 ${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.eritrea")}</span>
          </h2>
          <Link 
            to="/eritrea" 
            className={`destination-card-link flex items-center justify-end text-blue-600 hover:text-blue-800 transition-colors font-medium uppercase ${language === 'ar' ? 'flex-row-reverse font-arabic' : ''}`}
          >
            {language === 'ar' && <ArrowLeft size={16} className="ml-1 transition-transform group-hover:-translate-x-1" />}
            {t("dashboard.viewDetails")}
            {language === 'en' && <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDestinations;
