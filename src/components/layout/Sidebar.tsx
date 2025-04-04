
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainNavigation from "./MainNavigation";
import UserProfileSection from "./UserProfileSection";

const SidebarWrapper = () => {
  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 border-r border-gray-200 shadow-sm flex-shrink-0 animate-fade-in">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-200 flex flex-col items-center bg-gradient-to-r from-blue-50 to-green-50">
          <div className="hover-scale pulse-animation mb-3">
            <img 
              src="/lovable-uploads/b4cd42be-7824-4f8b-a647-00c816cc0045.png" 
              alt="SOQOTRA LOGO" 
              className="h-16 w-auto"
            />
          </div>
          
          <div className="text-center">
            <p className="font-semibold text-sm text-gray-800 leading-tight uppercase">SOQOTRA LOGISTICS SERVICES,</p>
            <p className="font-semibold text-sm text-gray-800 leading-tight uppercase">TRANSPORTATION & TRADING WLL</p>
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
