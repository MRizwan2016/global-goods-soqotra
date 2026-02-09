
import React from "react";
import DestinationCard from "./DestinationCard";
import { useLanguage } from '@/contexts/LanguageContext';

const AdditionalDestinations = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="animate-fade-in">
      <h2 className={`text-lg font-semibold text-[#1e2a3a] mb-4 flex items-center gap-2 ${language === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}>
        <span className="w-1 h-5 bg-[#3b5998] rounded-full inline-block"></span>
        {t("dashboard.additionalDestinations")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DestinationCard
          country={t("country.syria")}
          bgColor=""
          to="/syria"
        />
        <DestinationCard
          country={t("country.saudiArabia")}
          bgColor=""
          to="/saudi-arabia"
        />
        <DestinationCard
          country={t("country.ethiopia")}
          bgColor=""
          to="/ethiopia"
        />
        <DestinationCard
          country={t("country.sudan")}
          bgColor=""
          to="/sudan"
        />
        <DestinationCard
          country={t("country.eritrea")}
          bgColor=""
          to="/eritrea"
        />
        <DestinationCard
          country={t("country.algeria")}
          bgColor=""
          to="/algeria"
        />
      </div>
    </div>
  );
};

export default AdditionalDestinations;
