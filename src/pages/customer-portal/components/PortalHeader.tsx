import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Language } from '../i18n/translations';

interface PortalHeaderProps {
  lang: Language;
  onToggleLang: () => void;
  rightContent?: React.ReactNode;
}

const PortalHeader: React.FC<PortalHeaderProps> = ({ lang, onToggleLang, rightContent }) => {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img
              src="/soqotra-logo.png"
              alt="Soqotra Logistics"
              className="h-10 w-10 rounded-full bg-white p-0.5 object-contain"
            />
            <div className={lang === 'ar' ? 'text-right font-arabic' : ''}>
              <h1 className="text-sm font-bold leading-tight">
                {lang === 'ar' ? 'خدمات سقطرى اللوجستية' : 'SOQOTRA LOGISTICS SERVICES'}
              </h1>
              <p className="text-xs opacity-80">
                {lang === 'ar' ? 'بوابة تتبع العملاء' : 'Customer Tracking Portal'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleLang}
              className="text-primary-foreground hover:bg-white/10"
            >
              <Globe className="h-4 w-4 mr-1" />
              {lang === 'en' ? 'عربي' : 'English'}
            </Button>
            {rightContent}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PortalHeader;
