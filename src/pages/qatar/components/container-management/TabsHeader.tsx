
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsHeaderProps {
  activeTab: string;
}

const TabsHeader: React.FC<TabsHeaderProps> = ({ activeTab }) => {
  return (
    <TabsList className="w-full justify-start border-b rounded-none px-4 bg-gray-50">
      <TabsTrigger value="containers" className="data-[state=active]:bg-white">
        Container List
      </TabsTrigger>
      <TabsTrigger value="add" className="data-[state=active]:bg-white">
        Add Container
      </TabsTrigger>
      {activeTab === "edit" && (
        <TabsTrigger value="edit" className="data-[state=active]:bg-white">
          Edit Container
        </TabsTrigger>
      )}
      {activeTab === "load" && (
        <TabsTrigger value="load" className="data-[state=active]:bg-white">
          Load Container
        </TabsTrigger>
      )}
      {activeTab === "manifest" && (
        <TabsTrigger value="manifest" className="data-[state=active]:bg-white">
          Container Manifest
        </TabsTrigger>
      )}
      {activeTab === "view-manifest" && (
        <TabsTrigger value="view-manifest" className="data-[state=active]:bg-white">
          View Manifest
        </TabsTrigger>
      )}
    </TabsList>
  );
};

export default TabsHeader;
