
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useVesselList } from "./hooks/useVesselList";
import VesselSearch from "./vessel-list/VesselSearch";
import SectorFilter from "./vessel-list/SectorFilter";
import VesselsTable from "./vessel-list/VesselsTable";
import VesselSummary from "./vessel-list/VesselSummary";

interface VesselListProps {
  onVesselSelect: (vesselId: string) => void;
}

const VesselList: React.FC<VesselListProps> = ({ onVesselSelect }) => {
  const {
    searchTerm,
    setSearchTerm,
    sectorFilter,
    setSectorFilter,
    filteredVessels,
    totalVessels
  } = useVesselList();

  return (
    <Card className="shadow-md border-gray-200">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <VesselSearch 
              searchTerm={searchTerm} 
              onSearchChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          
          <div className="w-full md:w-64">
            <SectorFilter 
              value={sectorFilter} 
              onChange={setSectorFilter} 
            />
          </div>
        </div>
        
        <VesselsTable 
          vessels={filteredVessels} 
          onVesselSelect={onVesselSelect} 
        />
        
        <div className="flex justify-between items-center mt-4">
          <VesselSummary 
            filteredCount={filteredVessels.length} 
            totalCount={totalVessels} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default VesselList;
