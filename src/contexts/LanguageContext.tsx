
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { arTranslations } from "@/translations/ar";

type Language = "en" | "ar" | "am" | "sw" | "si" | "ta";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getAvailableLanguages: (country?: string) => Language[];
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "language.switch": "العربية",
    "dashboard.title": "Dashboard Overview",
    "dashboard.primaryDestinations": "Primary Destinations",
    "dashboard.additionalDestinations": "Additional Destinations",
    "dashboard.viewDetails": "View Details",
    "navigation.back": "Back",
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
    "country.algeria": "Algeria",
    // Storage
    "storage.warehouseManager": "Warehouse Storage Manager",
    "storage.storageFee": "Storage Fee",
    "storage.gracePeriod": "Grace Period",
    "storage.days": "days",
    "storage.daysInStorage": "Days in Storage",
    "storage.chargeableDays": "Chargeable Days",
    "storage.dailyRate": "Daily Rate",
    "storage.totalStorageFee": "Total Storage Fee",
    "storage.vehicle": "Vehicle",
    "storage.personalEffects": "Personal Effects",
    "storage.cargoType": "Cargo Type",
    "storage.receivedDate": "Warehouse Received Date",
    "storage.addRecord": "Add Storage Record",
    "storage.noRecords": "No storage records found",
    "storage.unpaidTotal": "Unpaid Total",
    "storage.invoice": "Storage Invoice",
    "storage.invoiceTitle": "Storage Fee Invoice",
    "storage.customerSignature": "Customer Signature",
    "storage.authorizedSignature": "Authorized Signature",
    "storage.notes": "Notes",
  },
  ar: arTranslations,
  am: {
    "dashboard.title": "የመቆጣጠሪያ ሰሌዳ ወጪ",
    "dashboard.primaryDestinations": "ዋና መዳረሻዎች",
    "dashboard.additionalDestinations": "ተጨማሪ መዳረሻዎች",
    "dashboard.viewDetails": "ዝርዝሮች ይመልከቱ",
    "navigation.back": "ተመለስ",
    "language.switch": "English",
  },
  sw: {
    "dashboard.title": "Muhtasari wa Dashibodi",
    "dashboard.primaryDestinations": "MARUDIO MAKUU",
    "dashboard.additionalDestinations": "MARUDIO MENGINE",
    "dashboard.viewDetails": "TAZAMA MAELEZO",
    "navigation.back": "Rudi",
    "language.switch": "English",
  },
  si: {
    "dashboard.title": "උපකරණ පුවරුවේ දළ විශ්ලේෂණය",
    "dashboard.primaryDestinations": "ප්‍රධාන ගමනාන්ත",
    "dashboard.additionalDestinations": "අමතර ගමනාන්ත",
    "dashboard.viewDetails": "විස්තර බලන්න",
    "navigation.back": "ආපසු",
    "language.switch": "English",
  },
  ta: {
    "dashboard.title": "டாஷ்போர்டு கண்ணோட்டம்",
    "dashboard.primaryDestinations": "முக்கிய இலக்குகள்",
    "dashboard.additionalDestinations": "கூடுதல் இலக்குகள்",
    "dashboard.viewDetails": "விவரங்களைப் பார்க்கவும்",
    "navigation.back": "திரும்பு",
    "language.switch": "English",
  }
};

const countryLanguages: Record<string, Language[]> = {
  "ethiopia": ["en", "ar", "am"],
  "kenya": ["en", "ar", "sw"],
  "sri-lanka": ["en", "ar", "si", "ta"],
  "srilanka": ["en", "ar", "si", "ta"],
  "saudi-arabia": ["en", "ar"],
  "sudan": ["en", "ar"],
  "sudan-ops": ["en", "ar"],
  "tunisia": ["en", "ar"],
  "default": ["en", "ar"]
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const isRTL = language === 'ar';
  
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    if (isRTL) {
      document.body.classList.remove('font-arabic');
      document.body.classList.add('font-nuska');
    } else {
      document.body.classList.remove('font-arabic', 'font-nuska');
    }
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const getAvailableLanguages = (country?: string): Language[] => {
    if (!country) return countryLanguages.default;
    return countryLanguages[country.toLowerCase()] || countryLanguages.default;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getAvailableLanguages, isRTL }}>
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
