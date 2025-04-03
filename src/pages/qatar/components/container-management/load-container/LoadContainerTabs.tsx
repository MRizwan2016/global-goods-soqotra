
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Search, Package, FileText } from "lucide-react";
import { ContainerCargo } from "../../../types/containerTypes";
import CargoSearchForm from "./CargoSearchForm";
import CargoLoader from "./CargoLoader";

interface LoadContainerTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  containerId: string;
  onAddCargo: (cargo: ContainerCargo) => void;
  existingCargo: ContainerCargo[];
}

const LoadContainerTabs: React.FC<LoadContainerTabsProps> = ({
  activeTab,
  setActiveTab,
  containerId,
  onAddCargo,
  existingCargo
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
      <TabsList className="grid grid-cols-2 mb-4 w-full max-w-md">
        <TabsTrigger value="advancedSearch" className="flex items-center">
          <Search className="mr-2 h-4 w-4" />
          Invoice Search
        </TabsTrigger>
        <TabsTrigger value="quickLoad" className="flex items-center">
          <Package className="mr-2 h-4 w-4" />
          Quick Load
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="advancedSearch">
        <Card>
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Invoice Search
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <CargoSearchForm 
              containerId={containerId} 
              onAddCargo={onAddCargo}
              existingCargo={existingCargo}
            />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="quickLoad">
        <CargoLoader 
          containerId={containerId} 
          onAddCargo={onAddCargo} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default LoadContainerTabs;
