
import React from "react";
import { Ship, PlusCircle, FileCheck, Printer, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center">
        <Ship size={32} className="mr-3 text-soqotra-blue" />
        <h1 className="text-3xl font-bold text-gray-800 uppercase">VESSEL MANAGEMENT</h1>
      </div>
      
      <div className="flex gap-2">
        {activeTab !== "list" && (
          <Button 
            variant="outline"
            className="flex items-center gap-2 hover:bg-gray-100"
            onClick={handleBackToList}
          >
            <ArrowLeft size={18} />
            BACK TO LIST
          </Button>
        )}
        
        <Button 
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 hover:scale-105 transition-transform uppercase"
          onClick={navigateToCargoManifest}
        >
          <FileCheck size={18} />
          CARGO MANIFEST
        </Button>
        
        {activeTab === "list" && (
          <>
            {selectedVesselId && manifestSubmitted && (
              <Button 
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform uppercase"
                onClick={handleViewManifest}
              >
                <Printer size={18} />
                VIEW MANIFEST
              </Button>
            )}
            <Button 
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 hover:scale-105 transition-transform uppercase"
              onClick={() => setActiveTab("add")}
            >
              <PlusCircle size={18} />
              ADD NEW VESSEL
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default VesselManagementHeader;
