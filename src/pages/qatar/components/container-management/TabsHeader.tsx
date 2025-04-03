
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box, Plus, Pen, Truck, FileText, Clipboard } from "lucide-react";

interface TabsHeaderProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TabsHeader: React.FC<TabsHeaderProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <TabsList className="bg-white border-b border-gray-200 w-full flex rounded-none p-0 h-auto">
      <TabsTrigger
        value="containers"
        className={`flex items-center py-3 px-5 transition-colors ${
          activeTab === "containers" 
            ? "border-b-2 border-blue-600 text-blue-600" 
            : "text-gray-500 hover:text-gray-800"
        }`}
        onClick={() => onTabChange("containers")}
      >
        <Box className="mr-2 h-5 w-5" />
        CONTAINERS
      </TabsTrigger>
      
      <TabsTrigger
        value="add"
        className={`flex items-center py-3 px-5 transition-colors ${
          activeTab === "add" 
            ? "border-b-2 border-blue-600 text-blue-600" 
            : "text-gray-500 hover:text-gray-800"
        }`}
        onClick={() => onTabChange("add")}
      >
        <Plus className="mr-2 h-5 w-5" />
        ADD NEW
      </TabsTrigger>

      <TabsTrigger
        value="edit"
        disabled={activeTab !== "edit"}
        className={`flex items-center py-3 px-5 transition-colors ${
          activeTab === "edit" 
            ? "border-b-2 border-blue-600 text-blue-600" 
            : "text-gray-500 hover:text-gray-800"
        }`}
      >
        <Pen className="mr-2 h-5 w-5" />
        EDIT
      </TabsTrigger>

      <TabsTrigger
        value="load"
        disabled={activeTab !== "load"}
        className={`flex items-center py-3 px-5 transition-colors ${
          activeTab === "load" 
            ? "border-b-2 border-blue-600 text-blue-600" 
            : "text-gray-500 hover:text-gray-800"
        }`}
      >
        <Truck className="mr-2 h-5 w-5" />
        LOAD
      </TabsTrigger>

      <TabsTrigger
        value="manifest"
        disabled={activeTab !== "manifest"}
        className={`flex items-center py-3 px-5 transition-colors ${
          activeTab === "manifest" 
            ? "border-b-2 border-blue-600 text-blue-600" 
            : "text-gray-500 hover:text-gray-800"
        }`}
      >
        <Clipboard className="mr-2 h-5 w-5" />
        MANIFEST
      </TabsTrigger>

      <TabsTrigger
        value="view-manifest"
        disabled={activeTab !== "view-manifest"}
        className={`flex items-center py-3 px-5 transition-colors ${
          activeTab === "view-manifest" 
            ? "border-b-2 border-blue-600 text-blue-600" 
            : "text-gray-500 hover:text-gray-800"
        }`}
      >
        <FileText className="mr-2 h-5 w-5" />
        VIEW MANIFEST
      </TabsTrigger>
    </TabsList>
  );
};

export default TabsHeader;
