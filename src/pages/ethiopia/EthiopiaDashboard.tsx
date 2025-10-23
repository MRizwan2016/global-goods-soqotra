
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
        <p className={`text-gray-600 ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'حلول لوجستية في جميع أنحاء إثيوبيا' : 'Logistics solutions throughout Ethiopia'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className={`${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.overview")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className={`${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' 
                  ? 'إثيوبيا هي دولة حبيسة في القرن الإفريقي. وهي الدولة الحبيسة الأكثر اكتظاظًا بالسكان في العالم، وثاني أكبر دولة من حيث عدد السكان في القارة الإفريقية. تركز عملياتنا في إثيوبيا على ربط هذه الدولة الحبيسة بطرق التجارة العالمية من خلال حلول لوجستية فعالة.'
                  : 'Ethiopia is a landlocked country in the Horn of Africa. It is the most populous landlocked country in the world and the second-most populous nation on the African continent. Our operations in Ethiopia focus on connecting this landlocked nation to global trade routes through efficient logistics solutions.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.capital")}</p>
                    <p className={`${language === 'ar' ? 'font-arabic' : ''}`}>{language === 'ar' ? 'أديس أبابا' : 'Addis Ababa'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Globe className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.population")}</p>
                    <p className={`${language === 'ar' ? 'font-arabic' : ''}`}>{language === 'ar' ? '١٢٠ مليون' : '120 million'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Flag className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.language")}</p>
                    <p className={`${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' 
                        ? 'الأمهرية، الأورومو، التيغرينية، الصومالية (من بين لغات أخرى)' 
                        : 'Amharic, Oromo, Tigrinya, Somali (among others)'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Briefcase className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.currency")}</p>
                    <p className={`${language === 'ar' ? 'font-arabic' : ''}`}>{language === 'ar' ? 'البر الإثيوبي (ETB)' : 'Ethiopian Birr (ETB)'}</p>
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
                  <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'الوصول إلى الموانئ' : 'Port Access'}
                  </p>
                  <p className={`${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar'
                      ? 'تستخدم ميناء جيبوتي للوصول إلى البحر، وتطور الوصول عبر ميناء بورتسودان وميناء بربرة'
                      : 'Uses Djibouti Port for sea access, and developing access through Port Sudan and Berbera Port'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Truck className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'البنية التحتية للنقل' : 'Transport Infrastructure'}
                  </p>
                  <p className={`${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar'
                      ? 'توسيع شبكة الطرق، خط سكة حديد أديس أبابا-جيبوتي'
                      : 'Expanding road network, Addis Ababa-Djibouti Railway'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <FileText className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.customs")}</p>
                  <p className={`${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar'
                      ? 'تتعامل هيئة الجمارك الإثيوبية مع جميع عمليات الاستيراد/التصدير، جاري تنفيذ نظام النافذة الواحدة الإلكتروني'
                      : 'Ethiopian Customs Commission handles all imports/exports, electronic single window implementation in progress'}
                  </p>
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
            <p className={`${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar'
                ? 'تركز عملياتنا في إثيوبيا على توفير حلول لوجستية فعالة لهذا البلد الحبيس، وربطه بالأسواق العالمية من خلال ممرات نقل متنوعة. وتشمل الخدمات الرئيسية:'
                : 'Our operations in Ethiopia focus on providing efficient logistics solutions for this landlocked country, connecting it to global markets through various transportation corridors. Key services include:'}
            </p>
            <ul className={`list-disc list-inside mt-2 space-y-1 ${language === 'ar' ? 'font-arabic' : ''}`}>
              <li>{language === 'ar' ? 'الخدمات اللوجستية لتصدير البن والمنتجات الزراعية' : 'Coffee and agricultural exports logistics'}</li>
              <li>{language === 'ar' ? 'الخدمات اللوجستية للتصنيع والمنسوجات' : 'Manufacturing and textile logistics'}</li>
              <li>{language === 'ar' ? 'تسهيل الاستيراد عبر ممر جيبوتي' : 'Import facilitation through Djibouti corridor'}</li>
              <li>{language === 'ar' ? 'التخزين في المناطق الصناعية الرئيسية' : 'Warehousing in key industrial zones'}</li>
              <li>{language === 'ar' ? 'النقل عبر الحدود إلى البلدان المجاورة' : 'Cross-border transportation to neighboring countries'}</li>
              <li>{language === 'ar' ? 'خدمات الشحن الجوي عبر مطار بولي الدولي' : 'Air freight services through Bole International Airport'}</li>
              <li>{language === 'ar' ? 'شحن المشاريع لتطوير البنية التحتية' : 'Project cargo for infrastructure development'}</li>
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
                <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'مكتب أديس أبابا' : 'Addis Ababa Office'}
                </p>
                <p className={`text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'بولي ساب-سيتي، ووريدا 03، شارع أفريقيا، أديس أبابا' : 'Bole Sub-City, Woreda 03, Africa Avenue, Addis Ababa'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'فرع دير داوا' : 'Dire Dawa Branch'}
                </p>
                <p className={`text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'منطقة كيزيرا، بالقرب من محطة السكك الحديدية، دير داوا' : 'Kezira Area, Near Railway Station, Dire Dawa'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Phone className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'أرقام الاتصال' : 'Contact Numbers'}
                </p>
                <p className={`text-sm ${language === 'ar' ? 'font-arabic text-right' : ''}`}>+251 11 667 1234 (Addis Ababa)</p>
                <p className={`text-sm ${language === 'ar' ? 'font-arabic text-right' : ''}`}>+251 25 111 5678 (Dire Dawa)</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Globe className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </p>
                <p className={`text-sm ${language === 'ar' ? 'font-arabic text-right' : ''}`}>ethiopia.logistics@soqotra-logistics.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EthiopiaDashboard;
