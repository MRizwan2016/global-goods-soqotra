
import React, { ReactNode } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";

interface Tab {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface RegistrationLayoutProps {
  title: string;
  subtitle: string;
  tabs: Tab[];
  children: ReactNode;
  defaultTab?: string;
  icon?: React.ReactNode;
}

const RegistrationLayout: React.FC<RegistrationLayoutProps> = ({ 
  title, 
  subtitle, 
  tabs, 
  children, 
  defaultTab,
  icon 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Only try to find the active tab if tabs array has elements
  const activeTab = tabs.length > 0 
    ? (tabs.find(tab => tab.path === location.pathname)?.id || defaultTab || (tabs[0]?.id ?? ""))
    : "";
  
  const handleTabChange = (tabId: string) => {
    // Only attempt to navigate if tabs exist
    if (tabs.length > 0) {
      const tab = tabs.find(t => t.id === tabId);
      if (tab) {
        navigate(tab.path);
      }
    }
  };

  return (
    <Layout title={title}>
      <Card className="border-t-4 border-t-purple-600">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                {title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {subtitle}
              </CardDescription>
            </div>
            {icon && (
              <div className="bg-white p-3 rounded-full shadow-sm">
                {icon}
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          {tabs.length > 1 && (
            <Tabs 
              defaultValue={activeTab} 
              value={activeTab}
              onValueChange={handleTabChange}
              className="mb-6"
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                {tabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex items-center gap-2"
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
          {children}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default RegistrationLayout;
