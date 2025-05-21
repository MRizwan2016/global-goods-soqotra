
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Flag, Globe, Briefcase, FileText, Ship, Truck } from "lucide-react";
import CountryBackButton from "@/components/ui/country-back-button";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { useLanguage } from "@/contexts/LanguageContext";

const SaudiArabiaDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <Layout title="Saudi Arabia Operations">
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          <CountryBackButton />
          <LanguageSwitcher />
        </div>
        <div className="flex items-center gap-3 mb-2">
          <span className="flag-icon flag-saudi-arabia w-10 h-6"></span>
          <h1 className={`text-3xl font-bold text-gray-800 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {t("country.saudiArabia")}
          </h1>
        </div>
        <p className="text-gray-600">Comprehensive logistics services across Saudi Arabia</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className={`${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.overview")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Saudi Arabia, officially the Kingdom of Saudi Arabia, is a country in Western Asia. It is the largest country in the Middle East, and the second-largest country in the Arab world.
                Our operations in Saudi Arabia encompass comprehensive logistics solutions for the Kingdom's thriving economy.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{t("country.details.capital")}</p>
                    <p>Riyadh</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Globe className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{t("country.details.population")}</p>
                    <p>35.5 million</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Flag className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{t("country.details.language")}</p>
                    <p>Arabic</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Briefcase className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{t("country.details.currency")}</p>
                    <p>Saudi Riyal (SAR)</p>
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
                  <p className="font-medium">{t("country.details.ports")}</p>
                  <p>Jeddah Islamic Port, King Abdulaziz Port (Dammam), King Fahd Industrial Port (Yanbu), Jubail Commercial Port</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <FileText className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-medium">{t("country.details.customs")}</p>
                  <p>Electronic customs clearance system (FASAH), import licenses required for certain goods</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Truck className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Major Transport Corridors</p>
                  <p>East-West Expressway, North-South Highway, Riyadh-Dammam Highway</p>
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
              Our operations in Saudi Arabia are extensive, covering the entire logistics spectrum from port
              operations to last-mile delivery. We specialize in:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Oil and gas logistics</li>
              <li>Construction material transportation</li>
              <li>Consumer goods distribution</li>
              <li>Cross-border freight services</li>
              <li>Warehousing and distribution</li>
              <li>Project logistics for mega-projects</li>
              <li>Cold chain logistics for food and pharmaceuticals</li>
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
                <p className="font-medium">Riyadh Head Office</p>
                <p className="text-sm">King Fahd Road, Al Olaya District, Riyadh 12213</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium">Jeddah Branch</p>
                <p className="text-sm">Al Andalus District, Prince Sultan Street, Jeddah 23218</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Phone className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Contact Number</p>
                <p className="text-sm">+966 11 4567890 (Riyadh)</p>
                <p className="text-sm">+966 12 6543210 (Jeddah)</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Globe className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm">ksa.operations@soqotra-logistics.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SaudiArabiaDashboard;
