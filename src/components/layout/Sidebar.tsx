
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainNavigation from "./MainNavigation";
import UserProfileSection from "./UserProfileSection";

const SidebarWrapper = () => {
  return (
    <div className="w-64 min-h-screen bg-sky-50 border-r border-sky-100 shadow-sm">
      <div className="flex flex-col h-full">
        <ScrollArea className="flex-1">
          <MainNavigation />
        </ScrollArea>
        
        <UserProfileSection />
      </div>
    </div>
  );
};

export default SidebarWrapper;
