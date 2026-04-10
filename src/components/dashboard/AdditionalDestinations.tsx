
import React from "react";
import DestinationCard from "./DestinationCard";
import { useLanguage } from '@/contexts/LanguageContext';

const AdditionalDestinations = () => {
  const { t, language } = useLanguage();
  
  const destinations = [
    { country: t("country.syria"), to: "/syria", flag: "🇸🇾" },
    { country: t("country.saudiArabia"), to: "/saudi-arabia", flag: "🇸🇦" },
    { country: t("country.ethiopia"), to: "/ethiopia", flag: "🇪🇹" },
    { country: t("country.sudan"), to: "/sudan", flag: "🇸🇩" },
    { country: t("country.eritrea"), to: "/eritrea", flag: "🇪🇷" },
    { country: t("country.algeria"), to: "/algeria", flag: "🇩🇿" },
  ];

  return (
    <div className="animate-fade-in">
      <h2 className={`text-lg font-semibold text-[#1e2a3a] mb-4 flex items-center gap-2 ${language === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}>
        <span className="w-1 h-5 bg-[#3b5998] rounded-full inline-block"></span>
        {t("dashboard.additionalDestinations")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {destinations.map((dest) => (
          <DestinationCard
            key={dest.to}
            country={dest.country}
            bgColor=""
            to={dest.to}
            flagEmoji={dest.flag}
          />
        ))}
      </div>
    </div>
  );
};

export default AdditionalDestinations;
