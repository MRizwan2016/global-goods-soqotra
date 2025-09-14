
import React from "react";
import DestinationCard from "./DestinationCard";
import { useLanguage } from '@/contexts/LanguageContext';

const PrimaryDestinations = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="mb-8 animate-fade-in bg-gray-100 rounded-3xl p-8 border-4 border-black shadow-lg">
      <div className="inline-block border-4 border-red-500 rounded-full px-6 py-2 mb-6 bg-white">
        <h2 className={`text-xl font-bold text-black uppercase tracking-wider ${language === 'ar' ? 'font-arabic' : 'font-mono'}`}>
          {t("dashboard.primaryDestinations")}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DestinationCard
          country={t("country.kenya")}
          bgColor="from-emerald-300 to-green-400"
          borderColor="border-emerald-100"
          to="/kenya"
        />
        
        <DestinationCard
          country={t("country.tunisia")}
          bgColor="from-red-300 to-rose-400"
          borderColor="border-red-100"
          to="/tunisia"
        />
        
        <DestinationCard
          country={t("country.uganda")}
          bgColor="from-yellow-300 to-amber-400"
          borderColor="border-yellow-100"
          to="/uganda"
        />
        
        <DestinationCard
          country={t("country.philippines")}
          bgColor="from-blue-300 to-indigo-400"
          borderColor="border-blue-100"
          to="/philippines"
        />
        
        <DestinationCard
          country={t("country.sriLanka")}
          bgColor="from-purple-300 to-violet-400"
          borderColor="border-purple-100"
          to="/sri-lanka"
        />
        
        <DestinationCard
          country={t("country.somalia")}
          bgColor="from-cyan-300 to-teal-400"
          borderColor="border-cyan-100"
          to="/somalia"
        />
      </div>
    </div>
  );
};

export default PrimaryDestinations;
