
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
        <p className={`text-gray-600 ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'خدمات لوجستية شاملة في جميع أنحاء المملكة العربية السعودية' : 'Comprehensive logistics services across Saudi Arabia'}
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
                  ? 'المملكة العربية السعودية هي دولة في غرب آسيا. وهي أكبر دولة في الشرق الأوسط، وثاني أكبر دولة في العالم العربي. تشمل عملياتنا في المملكة العربية السعودية حلولاً لوجستية شاملة لاقتصاد المملكة المزدهر.'
                  : 'Saudi Arabia, officially the Kingdom of Saudi Arabia, is a country in Western Asia. It is the largest country in the Middle East, and the second-largest country in the Arab world. Our operations in Saudi Arabia encompass comprehensive logistics solutions for the Kingdom\'s thriving economy.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.capital")}</p>
                    <p className={`${language === 'ar' ? 'font-arabic' : ''}`}>{language === 'ar' ? 'الرياض' : 'Riyadh'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Globe className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.population")}</p>
                    <p className={`${language === 'ar' ? 'font-arabic' : ''}`}>{language === 'ar' ? '٣٥.٥ مليون' : '35.5 million'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Flag className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.language")}</p>
                    <p className={`${language === 'ar' ? 'font-arabic' : ''}`}>{language === 'ar' ? 'العربية' : 'Arabic'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Briefcase className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.currency")}</p>
                    <p className={`${language === 'ar' ? 'font-arabic' : ''}`}>{language === 'ar' ? 'الريال السعودي (SAR)' : 'Saudi Riyal (SAR)'}</p>
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
                  <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.ports")}</p>
                  <p className={`${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' 
                      ? 'ميناء جدة الإسلامي، ميناء الملك عبد العزيز (الدمام)، ميناء الملك فهد الصناعي (ينبع)، ميناء الجبيل التجاري'
                      : 'Jeddah Islamic Port, King Abdulaziz Port (Dammam), King Fahd Industrial Port (Yanbu), Jubail Commercial Port'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <FileText className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>{t("country.details.customs")}</p>
                  <p className={`${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar'
                      ? 'نظام التخليص الجمركي الإلكتروني (فسح)، تراخيص الاستيراد مطلوبة لبعض السلع'
                      : 'Electronic customs clearance system (FASAH), import licenses required for certain goods'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Truck className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar' ? 'ممرات النقل الرئيسية' : 'Major Transport Corridors'}
                  </p>
                  <p className={`${language === 'ar' ? 'font-arabic' : ''}`}>
                    {language === 'ar'
                      ? 'طريق الشرق-الغرب السريع، طريق الشمال-الجنوب السريع، طريق الرياض-الدمام السريع'
                      : 'East-West Expressway, North-South Highway, Riyadh-Dammam Highway'}
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
                ? 'عملياتنا في المملكة العربية السعودية واسعة النطاق، وتغطي كامل سلسلة الخدمات اللوجستية من عمليات الموانئ إلى خدمات التوصيل للميل الأخير. نحن متخصصون في:'
                : 'Our operations in Saudi Arabia are extensive, covering the entire logistics spectrum from port operations to last-mile delivery. We specialize in:'}
            </p>
            <ul className={`list-disc list-inside mt-2 space-y-1 ${language === 'ar' ? 'font-arabic' : ''}`}>
              <li>{language === 'ar' ? 'الخدمات اللوجستية للنفط والغاز' : 'Oil and gas logistics'}</li>
              <li>{language === 'ar' ? 'نقل مواد البناء' : 'Construction material transportation'}</li>
              <li>{language === 'ar' ? 'توزيع السلع الاستهلاكية' : 'Consumer goods distribution'}</li>
              <li>{language === 'ar' ? 'خدمات الشحن عبر الحدود' : 'Cross-border freight services'}</li>
              <li>{language === 'ar' ? 'التخزين والتوزيع' : 'Warehousing and distribution'}</li>
              <li>{language === 'ar' ? 'الخدمات اللوجستية للمشاريع العملاقة' : 'Project logistics for mega-projects'}</li>
              <li>{language === 'ar' ? 'الخدمات اللوجستية للسلسلة الباردة للأغذية والأدوية' : 'Cold chain logistics for food and pharmaceuticals'}</li>
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
                  {language === 'ar' ? 'المكتب الرئيسي في الرياض' : 'Riyadh Head Office'}
                </p>
                <p className={`text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'طريق الملك فهد، حي العليا، الرياض 12213' : 'King Fahd Road, Al Olaya District, Riyadh 12213'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'فرع جدة' : 'Jeddah Branch'}
                </p>
                <p className={`text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'حي الأندلس، شارع الأمير سلطان، جدة 23218' : 'Al Andalus District, Prince Sultan Street, Jeddah 23218'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Phone className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'أرقام الاتصال' : 'Contact Number'}
                </p>
                <p className={`text-sm ${language === 'ar' ? 'font-arabic text-right' : ''}`}>+966 11 4567890 (Riyadh)</p>
                <p className={`text-sm ${language === 'ar' ? 'font-arabic text-right' : ''}`}>+966 12 6543210 (Jeddah)</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Globe className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <p className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </p>
                <p className={`text-sm ${language === 'ar' ? 'font-arabic text-right' : ''}`}>ksa.operations@soqotra-logistics.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SaudiArabiaDashboard;
