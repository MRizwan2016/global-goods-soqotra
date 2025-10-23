
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface LanguageSwitcherProps {
  className?: string;
  country?: string;
}

const languageNames = {
  en: "English",
  ar: "العربية",
  am: "አማርኛ",
  sw: "Kiswahili",
  si: "සිංහල",
  ta: "தமிழ்"
};

const LanguageSwitcher = ({ className = "", country }: LanguageSwitcherProps) => {
  const { language, setLanguage, getAvailableLanguages } = useLanguage();
  const location = useLocation();

  // Determine current country from the route if not provided
  const currentCountry = country || location.pathname.split('/')[1] || 'default';
  const availableLanguages = getAvailableLanguages(currentCountry);

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Add or remove Arabic font class to body
    if (language === 'ar') {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [language]);

  // If only 2 languages available, use toggle button (existing behavior)
  if (availableLanguages.length <= 2) {
    const toggleLanguage = () => {
      const otherLanguage = availableLanguages.find(lang => lang !== language) || availableLanguages[0];
      setLanguage(otherLanguage);
    };

    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={toggleLanguage}
        className={`flex items-center gap-2 ${language === 'ar' ? 'font-arabic' : ''} ${className}`}
      >
        <Globe className="h-4 w-4" />
        {languageNames[availableLanguages.find(lang => lang !== language) || availableLanguages[0]]}
      </Button>
    );
  }

  // If more than 2 languages, use dropdown
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe className="h-4 w-4" />
      <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
        <SelectTrigger className="w-32">
          <SelectValue>
            {languageNames[language]}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableLanguages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {languageNames[lang]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
