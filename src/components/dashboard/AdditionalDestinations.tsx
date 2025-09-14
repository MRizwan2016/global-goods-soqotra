
import React from "react";
import DestinationCard from "./DestinationCard";
import { useLanguage } from '@/contexts/LanguageContext';

const AdditionalDestinations = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="mb-8 animate-fade-in bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
      <h2 className={`text-xl font-semibold text-gray-700 mb-4 uppercase ${language === 'ar' ? 'font-arabic' : ''}`}>
        {t("dashboard.additionalDestinations")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DestinationCard
          country={t("country.syria")}
          bgColor="from-red-300 to-pink-400"
          borderColor="border-red-100"
          to="/syria"
        />
        
        <DestinationCard
          country={t("country.saudiArabia")}
          bgColor="from-green-300 to-emerald-400"
          borderColor="border-green-100"
          to="/saudi-arabia"
        />
        
        <DestinationCard
          country={t("country.ethiopia")}
          bgColor="from-yellow-300 to-orange-400"
          borderColor="border-yellow-100"
          to="/ethiopia"
        />
        
        <DestinationCard
          country={t("country.sudan")}
          bgColor="from-blue-300 to-sky-400"
          borderColor="border-blue-100"
          to="/sudan"
        />
        
        <DestinationCard
          country={t("country.eritrea")}
          bgColor="from-purple-300 to-pink-400"
          borderColor="border-purple-100"
          to="/eritrea"
        />
      </div>
    </div>
  );
};

export default AdditionalDestinations;
