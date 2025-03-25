
import { useState } from "react";
import { mockVesselData } from '../mockVesselData';

export function useVesselList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  
  // Filter vessels based on search term and sector filter
  const filteredVessels = mockVesselData.filter(vessel => {
    const matchesSearch = 
      vessel.runningNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vessel.vesselName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vessel.voyage.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSector = sectorFilter === "all" || vessel.sector === sectorFilter;
    
    return matchesSearch && matchesSector;
  });

  return {
    searchTerm,
    setSearchTerm,
    sectorFilter,
    setSectorFilter,
    filteredVessels,
    totalVessels: mockVesselData.length
  };
}
