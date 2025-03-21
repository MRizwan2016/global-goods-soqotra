
import { useState } from "react";
import { mockContainers } from "../../data/mockContainers";
import { QatarContainer } from "../../types/containerTypes";

export const useContainerList = () => {
  const [containers, setContainers] = useState<QatarContainer[]>(mockContainers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [entriesPerPage, setEntriesPerPage] = useState("50");
  
  const filteredContainers = containers.filter(container => {
    const matchesSearchTerm = 
      container.containerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.runningNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.sealNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || container.status === statusFilter;
    const matchesSector = sectorFilter === "all" || container.sector === sectorFilter;
    
    return matchesSearchTerm && matchesStatus && matchesSector;
  });

  return {
    containers,
    setContainers,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sectorFilter,
    setSectorFilter,
    entriesPerPage,
    setEntriesPerPage,
    filteredContainers
  };
};
