
import React from "react";
import { Button } from "@/components/ui/button";
import ContainerFilters from "./ContainerFilters";
import ContainerSearch from "./ContainerSearch";

interface ContainerActionsBarProps {
  sectorFilter: string;
  setSectorFilter: (sector: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ContainerActionsBar: React.FC<ContainerActionsBarProps> = ({
  sectorFilter,
  setSectorFilter,
  statusFilter,
  setStatusFilter,
  searchTerm,
  setSearchTerm
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-between mb-4">
      <ContainerFilters 
        sectorFilter={sectorFilter}
        setSectorFilter={setSectorFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      
      <div className="flex items-center gap-4">
        <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
          Add New
        </Button>
        <ContainerSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </div>
  );
};

export default ContainerActionsBar;
