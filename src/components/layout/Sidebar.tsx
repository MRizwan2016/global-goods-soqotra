
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainNavigation from "./MainNavigation";
import UserProfileSection from "./UserProfileSection";

const SidebarWrapper = () => {
  return (
    <div className="w-72 min-h-screen bg-white border-r border-gray-200 shadow-sm flex-shrink-0">
      <div className="flex flex-col h-full">
        {/* Logo and Company Name Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col items-center mb-2">
            <img 
              src="/lovable-uploads/10e20b91-b031-4e79-840f-238128cec5b4.png" 
              alt="SOQOTRA LOGO" 
              className="h-auto w-full mb-2"
            />
          </div>
          
          <div className="text-center">
            <p className="font-semibold text-xs text-gray-800 leading-tight">SOQOTRA LOGISTICS SERVICES,</p>
            <p className="font-semibold text-xs text-gray-800 leading-tight">TRANSPORTATION & TRADING WLL</p>
          </div>
        </div>
        
        <ScrollArea className="flex-1 px-3 py-4">
          <MainNavigation />
        </ScrollArea>
        
        <UserProfileSection />
      </div>
    </div>
  );
};

export default SidebarWrapper;
