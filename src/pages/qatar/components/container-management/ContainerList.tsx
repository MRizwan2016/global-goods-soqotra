
import React, { useState } from "react";
import { QatarContainer } from "../../types/containerTypes";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ContainerListHeader from "./components/ContainerListHeader";
import ContainerFilterBar from "./components/ContainerFilterBar";
import ContainerRow from "./components/ContainerRow";
import ContainerTableHead from "./components/ContainerTableHead";
import NoContainersFound from "./components/NoContainersFound";

interface ContainerListProps {
  containers: QatarContainer[];
  statusFilter?: string;
  searchText?: string;
  onEdit?: (containerId: string) => void;
  onDelete?: (containerId: string) => void;
  onLoad?: (containerId: string) => void;
  onViewManifest?: (containerId: string) => void;
  onCreateManifest?: (containerId: string) => void;
  onAddClick?: () => void;
}

const ContainerList: React.FC<ContainerListProps> = ({
  containers = [],
  statusFilter: externalStatusFilter = "",
  searchText: externalSearchText = "",
  onEdit,
  onDelete,
  onLoad,
  onViewManifest,
  onCreateManifest,
  onAddClick
}) => {
  const [searchTerm, setSearchTerm] = useState(externalSearchText);
  const [statusFilter, setStatusFilter] = useState(externalStatusFilter);
  const [directionFilter, setDirectionFilter] = useState("");
  
  // Filter containers based on search and filters, safely handling undefined or null containers
  const filteredContainers = (containers || []).filter(container => {
    // Apply search filter
    const matchesSearch = searchTerm === "" || 
      container.containerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (container.shippingLine && container.shippingLine.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (container.vessel && container.vessel.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Apply status filter
    const matchesStatus = statusFilter === "" || container.status === statusFilter;
    
    // Apply direction filter
    const matchesDirection = directionFilter === "" || container.direction === directionFilter;
    
    return matchesSearch && matchesStatus && matchesDirection;
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div className="p-6">
      <ContainerListHeader 
        totalContainers={containers.length} 
        filteredCount={filteredContainers.length} 
      />
      
      <ContainerFilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        directionFilter={directionFilter}
        setDirectionFilter={setDirectionFilter}
      />

      <motion.div 
        className="rounded-md border border-gray-200 overflow-hidden bg-white shadow-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <ContainerTableHead />
            <tbody>
              {filteredContainers.length > 0 ? (
                filteredContainers.map((container, index) => (
                  <ContainerRow 
                    key={container.id}
                    container={container}
                    index={index}
                    onEdit={onEdit}
                    onLoad={onLoad}
                    onViewManifest={onViewManifest}
                    onCreateManifest={onCreateManifest}
                  />
                ))
              ) : (
                <NoContainersFound />
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ContainerList;
