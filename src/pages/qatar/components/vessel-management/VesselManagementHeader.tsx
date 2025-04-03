
import React, { useState, useEffect } from "react";
import { ArrowLeft, Ship, FileText, FileCheck, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
  const [showActions, setShowActions] = useState(false);
  
  // When selectedVesselId changes, animate the actions
  useEffect(() => {
    setShowActions(!!selectedVesselId);
  }, [selectedVesselId]);
  
  const getTitle = () => {
    switch (activeTab) {
      case "list":
        return "Vessel Management";
      case "add":
        return "Add New Vessel";
      case "load":
        return "Load Containers to Vessel";
      case "manifest":
        return "Vessel Cargo Manifest";
      case "details":
        return "Vessel Details";
      default:
        return "Vessel Management";
    }
  };
  
  return (
    <motion.div 
      className="bg-gradient-to-r from-blue-100 to-white shadow-md rounded-lg mb-6 p-5"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {(activeTab !== "list") && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleBackToList}
                className="mr-4 hover:bg-blue-50 transition-colors"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back
              </Button>
            </motion.div>
          )}
          
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <Ship className="h-7 w-7 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-blue-800">{getTitle()}</h1>
          </motion.div>
        </div>
        
        {showActions && (
          <motion.div 
            className="flex gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {activeTab === "list" && (
              <Button
                variant="outline"
                onClick={() => setActiveTab("add")}
                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800 transition-colors"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New Vessel
              </Button>
            )}
            
            {selectedVesselId && manifestSubmitted && (
              <Button 
                onClick={handleViewManifest}
                className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:text-purple-800 transition-colors"
              >
                <FileText className="mr-2 h-4 w-4" />
                View Manifest
              </Button>
            )}
            
            {selectedVesselId && (
              <Button 
                onClick={navigateToCargoManifest}
                className="bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 hover:text-teal-800 transition-colors"
              >
                <FileCheck className="mr-2 h-4 w-4" />
                Cargo Manifest
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default VesselManagementHeader;
