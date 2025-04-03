
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Ship, 
  PlusCircle, 
  Anchor, 
  ClipboardList, 
  FileText 
} from "lucide-react";

interface VesselManagementHeaderProps {
  activeTab: string;
  selectedVesselId: string | null;
  manifestSubmitted: boolean;
  handleBackToList: () => void;
  handleViewManifest: () => void;
  navigateToCargoManifest: () => void;
  setActiveTab: (tab: string) => void;
}

const VesselManagementHeader: React.FC<VesselManagementHeaderProps> = ({
  activeTab,
  selectedVesselId,
  manifestSubmitted,
  handleBackToList,
  handleViewManifest,
  navigateToCargoManifest,
  setActiveTab
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold flex items-center">
          <Ship className="mr-2 h-6 w-6" />
          Vessel Management
        </h1>
        
        <div className="flex space-x-2">
          {activeTab !== "list" && (
            <Button variant="outline" onClick={handleBackToList} size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to List
            </Button>
          )}
          
          {activeTab === "list" && (
            <Button
              onClick={() => setActiveTab("add")}
              className="bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Vessel
            </Button>
          )}
          
          {selectedVesselId && activeTab === "list" && (
            <Button
              onClick={() => setActiveTab("load")}
              className="bg-amber-600 hover:bg-amber-700 text-white"
              size="sm"
            >
              <Anchor className="mr-2 h-4 w-4" />
              Load Containers
            </Button>
          )}
          
          {selectedVesselId && (activeTab === "list" || activeTab === "load") && manifestSubmitted && (
            <Button
              onClick={handleViewManifest}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <FileText className="mr-2 h-4 w-4" />
              View Manifest
            </Button>
          )}
          
          {selectedVesselId && manifestSubmitted && (
            <Button
              onClick={navigateToCargoManifest}
              className="bg-teal-600 hover:bg-teal-700 text-white"
              size="sm"
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              Cargo Manifest
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex border-b border-gray-200">
        <div 
          className={`py-2 px-4 font-medium cursor-pointer ${
            activeTab === "list" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("list")}
        >
          Vessel List
        </div>
        
        <div 
          className={`py-2 px-4 font-medium cursor-pointer ${
            activeTab === "add" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"
          }`}
          onClick={() => setActiveTab("add")}
        >
          Add Vessel
        </div>
        
        {selectedVesselId && (
          <div 
            className={`py-2 px-4 font-medium cursor-pointer ${
              activeTab === "load" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("load")}
          >
            Load Containers
          </div>
        )}
        
        {selectedVesselId && (
          <div 
            className={`py-2 px-4 font-medium cursor-pointer ${
              activeTab === "manifest" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab("manifest")}
          >
            Vessel Manifest
          </div>
        )}
      </div>
    </div>
  );
};

export default VesselManagementHeader;
