
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useContainerList } from "./useContainerList";
import ContainerListHeader from "./ContainerListHeader";
import ContainerActionsBar from "./ContainerActionsBar";
import ContainerTable from "./ContainerTable";
import ContainerPagination from "./ContainerPagination";

interface ContainerListProps {
  onContainerSelect: (containerId: string) => void;
}

const ContainerList: React.FC<ContainerListProps> = ({ onContainerSelect }) => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sectorFilter,
    setSectorFilter,
    entriesPerPage,
    setEntriesPerPage,
    filteredContainers
  } = useContainerList();
  
  return (
    <Card className="shadow-md border-gray-200">
      <CardContent className="p-0">
        <ContainerListHeader 
          filteredContainers={filteredContainers}
          entriesPerPage={entriesPerPage}
          setEntriesPerPage={setEntriesPerPage}
        />
        
        <div className="p-4">
          <ContainerActionsBar 
            sectorFilter={sectorFilter}
            setSectorFilter={setSectorFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        
        <ContainerTable 
          containers={filteredContainers} 
          onContainerSelect={onContainerSelect} 
        />
        
        <ContainerPagination 
          entriesPerPage={entriesPerPage}
          setEntriesPerPage={setEntriesPerPage}
          filteredContainers={filteredContainers}
        />
      </CardContent>
    </Card>
  );
};

export default ContainerList;
