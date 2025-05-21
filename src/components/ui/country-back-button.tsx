
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface CountryBackButtonProps {
  className?: string;
}

const CountryBackButton = ({ className = "" }: CountryBackButtonProps) => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={`flex items-center gap-2 hover:bg-slate-100 ${language === 'ar' ? 'font-arabic flex-row-reverse' : ''} ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {t("navigation.back")}
    </Button>
  );
};

export default CountryBackButton;
