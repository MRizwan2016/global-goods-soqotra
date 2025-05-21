
import React from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Flag, Globe, Briefcase, FileText } from "lucide-react";
import CountryBackButton from "@/components/ui/country-back-button";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { useLanguage } from "@/contexts/LanguageContext";

const SyriaDashboard: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <Layout title="Syria Operations">
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          <CountryBackButton />
          <LanguageSwitcher />
        </div>
        <div className="flex items-center gap-3 mb-2">
          <span className="flag-icon flag-syria w-10 h-6"></span>
          <h1 className={`text-3xl font-bold text-gray-800 ${language === 'ar' ? 'font-arabic' : ''}`}>Syria</h1>
        </div>
        <p className="text-gray-600">Logistics operations and services in Syria</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className={`${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.overview")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Syria, officially the Syrian Arab Republic, is a country in Western Asia. The capital and largest city is Damascus.
                Our operations in Syria focus on humanitarian logistics, reconstruction supplies, and essential goods.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{t("country.details.capital")}</p>
                    <p>Damascus</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Globe className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{t("country.details.population")}</p>
                    <p>17.5 million</p>
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
                    <p>Syrian Pound (SYP)</p>
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
                <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">{t("country.details.ports")}</p>
                  <p>Latakia, Tartus, Baniyas</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">{t("country.details.customs")}</p>
                  <p>Special import permits required for most goods</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">{t("country.details.regulations")}</p>
                  <p>Subject to international sanctions; special permissions needed</p>
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
              Our operations in Syria focus on humanitarian logistics and essential goods transportation.
              We work with international organizations and NGOs to ensure efficient delivery of aid and
              reconstruction materials across the country.
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Humanitarian aid logistics</li>
              <li>Essential goods transportation</li>
              <li>Reconstruction materials</li>
              <li>Medical supplies</li>
              <li>Food and nutrition assistance</li>
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
                <p className="font-medium">Damascus Office</p>
                <p className="text-sm">4th Floor, Al-Noor Building, Abu Rummaneh, Damascus</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Phone className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Contact Number</p>
                <p className="text-sm">+963 11 3345789</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Globe className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm">syria.ops@soqotra-logistics.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SyriaDashboard;
