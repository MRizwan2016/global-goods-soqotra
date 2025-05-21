
import React, { ReactNode } from 'react';
import SearchInvoiceButton from './SearchInvoiceButton';
import LanguageSwitcher from '@/components/ui/language-switcher';
import { useLanguage } from '@/contexts/LanguageContext';

interface DashboardContentProps {
  children: ReactNode;
  isLoaded: boolean;
}

const DashboardContent = ({ children, isLoaded }: DashboardContentProps) => {
  const { t, language } = useLanguage();
  
  return (
    <div 
      className={`p-6 transition-opacity duration-500 relative z-10 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      lang={language}
    >
      <div className="space-y-6 animate-fade-in dashboard-content">
        <div className={`flex justify-between items-center mb-6 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <h1 className={`text-2xl font-semibold text-gray-800 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {t("dashboard.title")}
          </h1>
          <div className={`flex items-center gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <LanguageSwitcher />
            <SearchInvoiceButton />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DashboardContent;
