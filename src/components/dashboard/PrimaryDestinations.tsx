
import React from "react";
import DestinationCard from "./DestinationCard";
import { useLanguage } from '@/contexts/LanguageContext';

const PrimaryDestinations = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="animate-fade-in">
      <h2 className={`text-lg font-semibold text-[#1e2a3a] mb-4 flex items-center gap-2 ${language === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}>
        <span className="w-1 h-5 bg-[#3b5998] rounded-full inline-block"></span>
        {t("dashboard.primaryDestinations")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DestinationCard
          country={t("country.kenya")}
          bgColor=""
          to="/kenya"
        />
        <DestinationCard
          country={t("country.tunisia")}
          bgColor=""
          to="/tunisia"
        />
        <DestinationCard
          country={t("country.uganda")}
          bgColor=""
          to="/uganda"
        />
        <DestinationCard
          country={t("country.philippines")}
          bgColor=""
          to="/philippines"
        />
        <DestinationCard
          country={t("country.sriLanka")}
          bgColor=""
          to="/sri-lanka"
        />
        <DestinationCard
          country={t("country.somalia")}
          bgColor=""
          to="/somalia"
        />
      </div>
    </div>
  );
};

export default PrimaryDestinations;
