
import React from "react";
import DestinationCard from "./DestinationCard";
import { useLanguage } from '@/contexts/LanguageContext';

const PrimaryDestinations = () => {
  const { t, language } = useLanguage();
  
  const destinations = [
    { country: t("country.kenya"), to: "/kenya", flagKey: "kenya" },
    { country: t("country.tunisia"), to: "/tunisia", flagKey: "tunisia" },
    { country: t("country.uganda"), to: "/uganda", flagKey: "uganda" },
    { country: t("country.philippines"), to: "/philippines", flagKey: "philippines" },
    { country: t("country.sriLanka"), to: "/sri-lanka", flagKey: "sri-lanka" },
    { country: t("country.somalia"), to: "/somalia", flagKey: "somalia" },
  ];

  return (
    <div className="animate-fade-in">
      <h2 className={`text-lg font-semibold text-[#1e2a3a] mb-4 flex items-center gap-2 ${language === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}>
        <span className="w-1 h-5 bg-[#3b5998] rounded-full inline-block"></span>
        {t("dashboard.primaryDestinations")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {destinations.map((dest) => (
          <DestinationCard
            key={dest.to}
            country={dest.country}
            bgColor=""
            to={dest.to}
            flagKey={dest.flagKey}
          />
        ))}
      </div>
    </div>
  );
};

export default PrimaryDestinations;
