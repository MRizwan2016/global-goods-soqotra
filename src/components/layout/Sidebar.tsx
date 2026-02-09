
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainNavigation from "./MainNavigation";
import UserProfileSection from "./UserProfileSection";

const SidebarWrapper = () => {
  return (
    <div className="w-72 min-h-screen bg-[#1e2a3a] border-r border-[#2a3a4e] shadow-lg flex-shrink-0">
      <div className="flex flex-col h-full">
        {/* Company Name Section */}
        <div className="p-5 border-b border-[#2a3a4e]">
          <div className="text-center">
            <p className="font-semibold text-xs text-slate-200 leading-tight tracking-wider">SOQOTRA LOGISTICS SERVICES,</p>
            <p className="font-semibold text-xs text-slate-200 leading-tight tracking-wider">TRANSPORTATION & TRADING WLL</p>
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
