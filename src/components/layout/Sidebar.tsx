
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainNavigation from "./MainNavigation";
import UserProfileSection from "./UserProfileSection";

const SidebarWrapper = () => {
  return (
    <div className="w-72 min-h-screen bg-gray-50 border-r border-gray-200 shadow-sm flex-shrink-0">
      <div className="flex flex-col h-full">
        <ScrollArea className="flex-1 px-2 py-4">
          <MainNavigation />
        </ScrollArea>
        
        <UserProfileSection />
      </div>
    </div>
  );
};

export default SidebarWrapper;
