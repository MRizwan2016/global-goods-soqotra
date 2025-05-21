
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Flag, Globe, Briefcase, FileText, Ship, Truck } from "lucide-react";
import CountryBackButton from "@/components/ui/country-back-button";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { useLanguage } from "@/contexts/LanguageContext";

const EthiopiaDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <Layout title="Ethiopia Operations">
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          <CountryBackButton />
          <LanguageSwitcher />
        </div>
        <div className="flex items-center gap-3 mb-2">
          <span className="flag-icon flag-ethiopia w-10 h-6"></span>
          <h1 className={`text-3xl font-bold text-gray-800 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {t("country.ethiopia")}
          </h1>
        </div>
        <p className="text-gray-600">Logistics solutions throughout Ethiopia</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className={`${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.overview")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Ethiopia is a landlocked country in the Horn of Africa. It is the most populous landlocked country in the world
                and the second-most populous nation on the African continent. Our operations in Ethiopia focus on connecting this
                landlocked nation to global trade routes through efficient logistics solutions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{t("country.details.capital")}</p>
                    <p>Addis Ababa</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Globe className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{t("country.details.population")}</p>
                    <p>120 million</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Flag className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{t("country.details.language")}</p>
                    <p>Amharic, Oromo, Tigrinya, Somali (among others)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Briefcase className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{t("country.details.currency")}</p>
                    <p>Ethiopian Birr (ETB)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className={`${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.logistics")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <Ship className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium">Port Access</p>
                  <p>Uses Djibouti Port for sea access, and developing access through Port Sudan and Berbera Port</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Truck className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Transport Infrastructure</p>
                  <p>Expanding road network, Addis Ababa-Djibouti Railway</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <FileText className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-medium">{t("country.details.customs")}</p>
                  <p>Ethiopian Customs Commission handles all imports/exports, electronic single window implementation in progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className={`${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.operations")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Our operations in Ethiopia focus on providing efficient logistics solutions for this landlocked country,
              connecting it to global markets through various transportation corridors. Key services include:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Coffee and agricultural exports logistics</li>
              <li>Manufacturing and textile logistics</li>
              <li>Import facilitation through Djibouti corridor</li>
              <li>Warehousing in key industrial zones</li>
              <li>Cross-border transportation to neighboring countries</li>
              <li>Air freight services through Bole International Airport</li>
              <li>Project cargo for infrastructure development</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className={`${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.contacts")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium">Addis Ababa Office</p>
                <p className="text-sm">Bole Sub-City, Woreda 03, Africa Avenue, Addis Ababa</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium">Dire Dawa Branch</p>
                <p className="text-sm">Kezira Area, Near Railway Station, Dire Dawa</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Phone className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Contact Numbers</p>
                <p className="text-sm">+251 11 667 1234 (Addis Ababa)</p>
                <p className="text-sm">+251 25 111 5678 (Dire Dawa)</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Globe className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm">ethiopia.logistics@soqotra-logistics.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EthiopiaDashboard;
