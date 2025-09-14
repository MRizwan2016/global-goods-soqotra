
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DestinationCard
          country={t("country.kenya")}
          bgColor="from-emerald-500 to-green-600"
          borderColor="border-emerald-200"
          to="/kenya"
        />
        
        <DestinationCard
          country={t("country.tunisia")}
          bgColor="from-red-500 to-rose-600"
          borderColor="border-red-200"
          to="/tunisia"
        />
        
        <DestinationCard
          country={t("country.uganda")}
          bgColor="from-yellow-500 to-amber-600"
          borderColor="border-yellow-200"
          to="/uganda"
        />
        
        <DestinationCard
          country={t("country.philippines")}
          bgColor="from-blue-500 to-indigo-600"
          borderColor="border-blue-200"
          to="/philippines"
        />
        
        <DestinationCard
          country={t("country.sriLanka")}
          bgColor="from-purple-500 to-violet-600"
          borderColor="border-purple-200"
          to="/sri-lanka"
        />
        
        <DestinationCard
          country={t("country.somalia")}
          bgColor="from-cyan-500 to-teal-600"
          borderColor="border-cyan-200"
          to="/somalia"
        />
      </div>
    </div>
  );
};

export default PrimaryDestinations;
