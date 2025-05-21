
import React from "react";
import DestinationCard from "./DestinationCard";
import { useLanguage } from '@/contexts/LanguageContext';

const PrimaryDestinations = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="mb-8 animate-fade-in">
      <h2 className={`text-xl font-semibold text-gray-700 mb-4 uppercase ${language === 'ar' ? 'font-arabic' : ''}`}>
        {t("dashboard.primaryDestinations")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DestinationCard
          country={t("country.kenya")}
          bgColor="bg-blue-50"
          to="/kenya"
        />
        
        <DestinationCard
          country={t("country.tunisia")}
          bgColor="bg-red-50"
          to="/tunisia"
        />
        
        <DestinationCard
          country={t("country.uganda")}
          bgColor="bg-green-50"
          to="/uganda"
        />
        
        <DestinationCard
          country={t("country.philippines")}
          bgColor="bg-yellow-50"
          to="/philippines"
        />
        
        <DestinationCard
          country={t("country.sriLanka")}
          bgColor="bg-purple-50"
          to="/sri-lanka"
        />
        
        <DestinationCard
          country={t("country.somalia")}
          bgColor="bg-orange-50"
          to="/somalia"
        />
      </div>
    </div>
  );
};

export default PrimaryDestinations;
