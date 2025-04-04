
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainNavigation from "./MainNavigation";
import UserProfileSection from "./UserProfileSection";

const SidebarWrapper = () => {
  return (
    <div className="w-72 min-h-screen bg-white border-r border-gray-200 shadow-sm flex-shrink-0">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-200 flex flex-col items-center">
          <img 
            src="/lovable-uploads/d86705a4-9b48-4585-b270-34e46b0d2159.png" 
            alt="Soqotra Logo" 
            className="h-16 w-auto mb-4"
          />
          
          <div className="text-center">
            <p className="font-semibold text-sm text-gray-800 leading-tight">SOQOTRA LOGISTICS SERVICES,</p>
            <p className="font-semibold text-sm text-gray-800 leading-tight">TRANSPORTATION & TRADING WLL</p>
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
