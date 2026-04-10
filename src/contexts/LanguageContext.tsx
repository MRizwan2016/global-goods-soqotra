
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "en" | "ar" | "am" | "sw" | "si" | "ta";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getAvailableLanguages: (country?: string) => Language[];
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
    "country.algeria": "Algeria",
    
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
    "country.algeria": "الجزائر",
    
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
  },
  am: {
    // Amharic translations for Ethiopia
    "dashboard.title": "የመቆጣጠሪያ ሰሌዳ ወጪ",
    "dashboard.primaryDestinations": "ዋና መዳረሻዎች",
    "dashboard.additionalDestinations": "ተጨማሪ መዳረሻዎች",
    "dashboard.viewDetails": "ዝርዝሮች ይመልከቱ",
    
    "country.kenya": "ኬንያ",
    "country.tunisia": "ቱኒዚያ",
    "country.uganda": "ዩጋንዳ",
    "country.philippines": "ፊሊፒንስ",
    "country.sriLanka": "ሲሪላንካ",
    "country.somalia": "ሶማሊያ",
    "country.syria": "ሶሪያ",
    "country.saudiArabia": "ሳውዲ አረቢያ",
    "country.ethiopia": "ኢትዮጵያ",
    "country.sudan": "ሱዳን",
    "country.eritrea": "ኤርትራ",
    "country.algeria": "አልጄሪያ",
    
    "navigation.back": "ተመለስ",
    "language.switch": "English",
    
    "country.details.overview": "የሀገር ዝርዝር",
    "country.details.capital": "ዋና ከተማ",
    "country.details.population": "ህዝብ ብዛት",
    "country.details.language": "ኦፊሴላዊ ቋንቋ",
    "country.details.currency": "ምንዛሪ",
    "country.details.logistics": "የማጓጓዣ መረጃ",
    "country.details.ports": "ዋና ወደቦች",
    "country.details.customs": "የጉምሩክ መስፈርቶች",
    "country.details.regulations": "የማስመጣት ደንቦች",
    "country.details.operations": "የእኛ ስራዎች",
    "country.details.contacts": "ዋና የመገናኛ አድራሾች",
  },
  sw: {
    // Swahili translations for Kenya
    "dashboard.title": "Muhtasari wa Dashibodi",
    "dashboard.primaryDestinations": "MARUDIO MAKUU",
    "dashboard.additionalDestinations": "MARUDIO MENGINE",
    "dashboard.viewDetails": "TAZAMA MAELEZO",
    
    "country.kenya": "Kenya",
    "country.tunisia": "Tunisia",
    "country.uganda": "Uganda",
    "country.philippines": "Ufilipino",
    "country.sriLanka": "Sri Lanka",
    "country.somalia": "Somalia",
    "country.syria": "Syria",
    "country.saudiArabia": "Saudi Arabia",
    "country.ethiopia": "Uhabeshi",
    "country.sudan": "Sudan",
    "country.eritrea": "Eritrea",
    "country.algeria": "Algeria",
    
    "navigation.back": "Rudi",
    "language.switch": "English",
    
    "country.details.overview": "Muhtasari wa Nchi",
    "country.details.capital": "Mji Mkuu",
    "country.details.population": "Idadi ya Watu",
    "country.details.language": "Lugha Rasmi",
    "country.details.currency": "Sarafu",
    "country.details.logistics": "Taarifa za Usafirishaji",
    "country.details.ports": "Bandari Kuu",
    "country.details.customs": "Mahitaji ya Forodha",
    "country.details.regulations": "Kanuni za Uagizaji",
    "country.details.operations": "Shughuli Zetu",
    "country.details.contacts": "Anwani Muhimu",
  },
  si: {
    // Sinhala translations for Sri Lanka
    "dashboard.title": "උපකරණ පුවරුවේ දළ විශ්ලේෂණය",
    "dashboard.primaryDestinations": "ප්‍රධාන ගමනාන්ත",
    "dashboard.additionalDestinations": "අමතර ගමනාන්ත",
    "dashboard.viewDetails": "විස්තර බලන්න",
    
    "country.kenya": "කෙන්යාව",
    "country.tunisia": "ටියුනීසියාව",
    "country.uganda": "උගන්ඩාව",
    "country.philippines": "පිලිපීනය",
    "country.sriLanka": "ශ්‍රී ලංකාව",
    "country.somalia": "සෝමාලියාව",
    "country.syria": "සිරියාව",
    "country.saudiArabia": "සෞදි අරාබිය",
    "country.ethiopia": "ඉතියෝපියාව",
    "country.sudan": "සුඩානය",
    "country.eritrea": "එරිත්‍රියාව",
    "country.algeria": "ඇල්ජීරියාව",
    
    "navigation.back": "ආපසු",
    "language.switch": "English",
    
    "country.details.overview": "රටේ දළ විශ්ලේෂණය",
    "country.details.capital": "අගනුවර",
    "country.details.population": "ජනගහනය",
    "country.details.language": "නිල භාෂාව",
    "country.details.currency": "මුදල් ඒකකය",
    "country.details.logistics": "ප්‍රවාහන තොරතුරු",
    "country.details.ports": "ප්‍රධාන වරායන්",
    "country.details.customs": "රේගු අවශ්‍යතා",
    "country.details.regulations": "ආනයන නීති",
    "country.details.operations": "අපගේ මෙහෙයුම්",
    "country.details.contacts": "ප්‍රධාන සම්බන්ධතා",
  },
  ta: {
    // Tamil translations for Sri Lanka
    "dashboard.title": "டாஷ்போர்டு கண்ணோட்டம்",
    "dashboard.primaryDestinations": "முக்கிய இலக்குகள்",
    "dashboard.additionalDestinations": "கூடுதல் இலக்குகள்",
    "dashboard.viewDetails": "விவரங்களைப் பார்க்கவும்",
    
    "country.kenya": "கென்யா",
    "country.tunisia": "துனிசியா",
    "country.uganda": "உகாண்டா",
    "country.philippines": "பிலிப்பைன்ஸ்",
    "country.sriLanka": "இலங்கை",
    "country.somalia": "சோமாலியா",
    "country.syria": "சிரியா",
    "country.saudiArabia": "சவுதி அரேபியா",
    "country.ethiopia": "எத்தியோப்பியா",
    "country.sudan": "சூடான்",
    "country.eritrea": "எரித்திரியா",
    "country.algeria": "அல்ஜீரியா",
    
    "navigation.back": "திரும்பு",
    "language.switch": "English",
    
    "country.details.overview": "நாட்டின் கண்ணோட்டம்",
    "country.details.capital": "தலைநகரம்",
    "country.details.population": "மக்கள்தொகை",
    "country.details.language": "அதிகாரப்பூர்வ மொழி",
    "country.details.currency": "நாணயம்",
    "country.details.logistics": "போக்குவரத்து தகவல்",
    "country.details.ports": "முக்கிய துறைமுகங்கள்",
    "country.details.customs": "சுங்க தேவைகள்",
    "country.details.regulations": "இறக்குமதி விதிமுறைகள்",
    "country.details.operations": "எங்கள் செயல்பாடுகள்",
    "country.details.contacts": "முக்கிய தொடர்புகள்",
  }
};

// Define official languages for each country
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
  
  useEffect(() => {
    // Add NUSKA font class to body when language is Arabic
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    if (language === 'ar') {
      document.body.classList.remove('font-arabic');
      document.body.classList.add('font-nuska');
    } else {
      document.body.classList.remove('font-arabic', 'font-nuska');
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const getAvailableLanguages = (country?: string): Language[] => {
    if (!country) return countryLanguages.default;
    return countryLanguages[country.toLowerCase()] || countryLanguages.default;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getAvailableLanguages }}>
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
