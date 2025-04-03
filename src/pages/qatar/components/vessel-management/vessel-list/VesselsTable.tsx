
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Ship, ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react";
import { QatarVessel } from "../types/vesselTypes";
import { motion } from "framer-motion";
import { useFormatters } from "../../../hooks/container-manifest/useFormatters";

interface VesselsTableProps {
  vessels: QatarVessel[];
  onVesselSelect: (vesselId: string) => void;
  onSort?: (key: keyof QatarVessel) => void;
  sortConfig?: {
    key: keyof QatarVessel;
    direction: 'asc' | 'desc';
  };
}

const VesselsTable: React.FC<VesselsTableProps> = ({ 
  vessels, 
  onVesselSelect,
  onSort,
  sortConfig
}) => {
  const { formatDate } = useFormatters();
  
  const getSortIcon = (columnName: keyof QatarVessel) => {
    if (!sortConfig) return <ArrowUpDown size={16} />;
    
    if (sortConfig.key === columnName) {
      return sortConfig.direction === 'asc' 
        ? <ChevronUp size={16} className="text-blue-600" /> 
        : <ChevronDown size={16} className="text-blue-600" />;
    }
    
    return <ArrowUpDown size={16} className="opacity-30" />;
  };
  
  const handleSortClick = (column: keyof QatarVessel) => {
    if (onSort) {
      onSort(column);
    }
  };
  
  // Helper for status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW":
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">New</span>;
      case "SCHEDULED":
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Scheduled</span>;
      case "LOADING":
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Loading</span>;
      case "LOADING_COMPLETE":
        return <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Loading Complete</span>;
      case "MANIFEST_SUBMITTED":
        return <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded">Manifest Submitted</span>;
      case "DEPARTED":
        return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Departed</span>;
      case "ARRIVED":
        return <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">Arrived</span>;
      case "ACTIVE":
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Active</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">{status}</span>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
            <TableHead className="text-white text-center w-16">Num</TableHead>
            
            <TableHead 
              className="text-white cursor-pointer"
              onClick={() => handleSortClick('runningNumber')}
            >
              <div className="flex items-center">
                Running Number
                {getSortIcon('runningNumber')}
              </div>
            </TableHead>
            
            <TableHead 
              className="text-white cursor-pointer"
              onClick={() => handleSortClick('vesselName')}
            >
              <div className="flex items-center">
                Vessel Name
                {getSortIcon('vesselName')}
              </div>
            </TableHead>
            
            <TableHead 
              className="text-white cursor-pointer"
              onClick={() => handleSortClick('voyage')}
            >
              <div className="flex items-center">
                Voyage
                {getSortIcon('voyage')}
              </div>
            </TableHead>
            
            <TableHead className="text-white">P.O.L</TableHead>
            <TableHead className="text-white">P.O.D</TableHead>
            
            <TableHead 
              className="text-white cursor-pointer"
              onClick={() => handleSortClick('direction')}
            >
              <div className="flex items-center">
                DIR/MIX
                {getSortIcon('direction')}
              </div>
            </TableHead>
            
            <TableHead 
              className="text-white cursor-pointer"
              onClick={() => handleSortClick('etd')}
            >
              <div className="flex items-center">
                E.T.D
                {getSortIcon('etd')}
              </div>
            </TableHead>
            
            <TableHead 
              className="text-white cursor-pointer"
              onClick={() => handleSortClick('eta')}
            >
              <div className="flex items-center">
                E.T.A
                {getSortIcon('eta')}
              </div>
            </TableHead>
            
            <TableHead 
              className="text-white cursor-pointer"
              onClick={() => handleSortClick('loadDate')}
            >
              <div className="flex items-center">
                Load Date
                {getSortIcon('loadDate')}
              </div>
            </TableHead>
            
            <TableHead 
              className="text-white cursor-pointer"
              onClick={() => handleSortClick('status')}
            >
              <div className="flex items-center">
                Status
                {getSortIcon('status')}
              </div>
            </TableHead>
            
            <TableHead className="text-white text-center w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vessels.map((vessel, index) => (
            <motion.tr
              key={vessel.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-blue-50 cursor-pointer"
              onClick={() => onVesselSelect(vessel.id)}
            >
              <TableCell className="text-center font-medium">{index + 1}</TableCell>
              <TableCell>{vessel.runningNumber}</TableCell>
              <TableCell className="font-medium">{vessel.vesselName}</TableCell>
              <TableCell>{vessel.voyage}</TableCell>
              <TableCell>{vessel.portOfLoading}</TableCell>
              <TableCell>{vessel.portOfDischarge}</TableCell>
              <TableCell>{vessel.direction === "MIX" ? "M" : "D"}</TableCell>
              <TableCell>{formatDate(vessel.etd)}</TableCell>
              <TableCell>{formatDate(vessel.eta)}</TableCell>
              <TableCell>{formatDate(vessel.loadDate) || "-"}</TableCell>
              <TableCell>{getStatusBadge(vessel.status)}</TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onVesselSelect(vessel.id);
                  }}
                  className="hover:bg-blue-100 text-blue-600"
                >
                  <Eye size={18} />
                </Button>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VesselsTable;
