
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Dashboard
    "dashboard.title": "Dashboard Overview",
    "dashboard.primaryDestinations": "PRIMARY DESTINATIONS",
    "dashboard.additionalDestinations": "ADDITIONAL DESTINATIONS",
    "dashboard.viewDetails": "VIEW DETAILS",
    
    // Country names
    "country.kenya": "Kenya",
    "country.tunisia": "Tunisia",
    "country.uganda": "Uganda",
    "country.philippines": "Philippines",
    "country.sriLanka": "Sri Lanka",
    "country.somalia": "Somalia",
    "country.syria": "Syria",
    "country.saudiArabia": "Saudi Arabia",
    "country.ethiopia": "Ethiopia",
    "country.sudan": "Sudan",
    "country.eritrea": "Eritrea",
    
    // Back button
    "navigation.back": "Back",
    
    // Language switcher
    "language.switch": "العربية",
    
    // Country details
    "country.details.overview": "Country Overview",
    "country.details.capital": "Capital",
    "country.details.population": "Population",
    "country.details.language": "Official Language",
    "country.details.currency": "Currency",
    "country.details.logistics": "Logistics Information",
    "country.details.ports": "Main Ports",
    "country.details.customs": "Customs Requirements",
    "country.details.regulations": "Import Regulations",
    "country.details.operations": "Our Operations",
    "country.details.contacts": "Key Contacts",
  },
  ar: {
    // Dashboard
    "dashboard.title": "نظرة عامة على لوحة المعلومات",
    "dashboard.primaryDestinations": "الوجهات الرئيسية",
    "dashboard.additionalDestinations": "وجهات إضافية",
    "dashboard.viewDetails": "عرض التفاصيل",
    
    // Country names
    "country.kenya": "كينيا",
    "country.tunisia": "تونس",
    "country.uganda": "أوغندا",
    "country.philippines": "الفلبين",
    "country.sriLanka": "سريلانكا",
    "country.somalia": "الصومال",
    "country.syria": "سوريا",
    "country.saudiArabia": "المملكة العربية السعودية",
    "country.ethiopia": "إثيوبيا",
    "country.sudan": "السودان",
    "country.eritrea": "إريتريا",
    
    // Back button
    "navigation.back": "رجوع",
    
    // Language switcher
    "language.switch": "English",
    
    // Country details
    "country.details.overview": "نظرة عامة على البلد",
    "country.details.capital": "العاصمة",
    "country.details.population": "عدد السكان",
    "country.details.language": "اللغة الرسمية",
    "country.details.currency": "العملة",
    "country.details.logistics": "معلومات الخدمات اللوجستية",
    "country.details.ports": "الموانئ الرئيسية",
    "country.details.customs": "متطلبات الجمارك",
    "country.details.regulations": "لوائح الاستيراد",
    "country.details.operations": "عملياتنا",
    "country.details.contacts": "جهات الاتصال الرئيسية",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  
  useEffect(() => {
    // Add Arabic font class to body when language is Arabic
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    if (language === 'ar') {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
