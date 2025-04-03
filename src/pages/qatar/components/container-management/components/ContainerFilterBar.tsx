
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface ContainerFilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  directionFilter: string;
  setDirectionFilter: (value: string) => void;
}

const ContainerFilterBar = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  directionFilter,
  setDirectionFilter
}: ContainerFilterBarProps) => {
  return (
    <motion.div 
      className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 px-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Search containers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-gray-200"
        />
      </div>
      
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="border-gray-200">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-statuses">All Statuses</SelectItem>
          <SelectItem value="Available">Available</SelectItem>
          <SelectItem value="In Transit">In Transit</SelectItem>
          <SelectItem value="Loading">Loading</SelectItem>
          <SelectItem value="Loaded">Loaded</SelectItem>
          <SelectItem value="CONFIRMED">Confirmed</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={directionFilter} onValueChange={setDirectionFilter}>
        <SelectTrigger className="border-gray-200">
          <SelectValue placeholder="Filter by direction" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-directions">All Directions</SelectItem>
          <SelectItem value="IMPORT">Import</SelectItem>
          <SelectItem value="EXPORT">Export</SelectItem>
          <SelectItem value="MIX">Mix</SelectItem>
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default ContainerFilterBar;
