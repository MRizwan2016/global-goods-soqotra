
import React, { useState } from "react";
import { QatarContainer } from "../../types/containerTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PenLine, Truck, FileText, ClipboardList, Search, Package } from "lucide-react";
import { motion } from "framer-motion";

interface ContainerListProps {
  containerData: QatarContainer[];
  onEdit?: (containerId: string) => void;
  onLoad?: (containerId: string) => void;
  onViewManifest?: (containerId: string) => void;
  onCreateManifest?: (containerId: string) => void;
}

const ContainerList: React.FC<ContainerListProps> = ({
  containerData,
  onEdit,
  onLoad,
  onViewManifest,
  onCreateManifest
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [directionFilter, setDirectionFilter] = useState("");
  
  // Filter containers based on search and filters
  const filteredContainers = containerData.filter(container => {
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
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6">
      <motion.div 
        className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
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
            <SelectItem value="">All Statuses</SelectItem>
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
            <SelectItem value="">All Directions</SelectItem>
            <SelectItem value="IMPORT">Import</SelectItem>
            <SelectItem value="EXPORT">Export</SelectItem>
            <SelectItem value="MIX">Mix</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div 
        className="rounded-md border border-gray-200 overflow-hidden bg-white shadow-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                <th className="p-3 text-left font-semibold">Container Number</th>
                <th className="p-3 text-left font-semibold">Type</th>
                <th className="p-3 text-left font-semibold">Status</th>
                <th className="p-3 text-left font-semibold">Shipping Line</th>
                <th className="p-3 text-left font-semibold">Direction</th>
                <th className="p-3 text-left font-semibold">Sector</th>
                <th className="p-3 text-left font-semibold">Volume</th>
                <th className="p-3 text-left font-semibold">Weight</th>
                <th className="p-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContainers.length > 0 ? (
                filteredContainers.map((container, index) => (
                  <motion.tr 
                    key={container.id} 
                    className="border-t hover:bg-blue-50 transition-colors"
                    variants={itemVariants}
                  >
                    <td className="p-3 font-medium">{container.containerNumber}</td>
                    <td className="p-3">{container.containerType || "N/A"}</td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          container.status === "Available" ? "bg-green-100 text-green-800" :
                          container.status === "In Transit" ? "bg-blue-100 text-blue-800" :
                          container.status === "Loading" ? "bg-yellow-100 text-yellow-800" :
                          container.status === "Loaded" ? "bg-purple-100 text-purple-800" :
                          container.status === "CONFIRMED" ? "bg-teal-100 text-teal-800" :
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {container.status || "Pending"}
                      </span>
                    </td>
                    <td className="p-3">{container.shippingLine || "N/A"}</td>
                    <td className="p-3">{container.direction || "N/A"}</td>
                    <td className="p-3">{container.sector || "N/A"}</td>
                    <td className="p-3">{container.volume ? `${container.volume.toFixed(3)} m³` : "0.000 m³"}</td>
                    <td className="p-3">{container.weight ? `${container.weight.toFixed(2)} kg` : "0.00 kg"}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        {onEdit && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEdit(container.id)}
                            title="Edit Container"
                            className="bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700"
                          >
                            <PenLine className="h-4 w-4" />
                          </Button>
                        )}
                        {onLoad && container.status !== "Loaded" && container.status !== "CONFIRMED" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onLoad(container.id)}
                            title="Load Container"
                            className="bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-700"
                          >
                            <Truck className="h-4 w-4" />
                          </Button>
                        )}
                        {onCreateManifest && container.status !== "CONFIRMED" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onCreateManifest(container.id)}
                            title="Create Manifest"
                            className="bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-700"
                          >
                            <ClipboardList className="h-4 w-4" />
                          </Button>
                        )}
                        {onViewManifest && container.status === "CONFIRMED" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onViewManifest(container.id)}
                            title="View Manifest"
                            className="bg-green-50 border-green-200 hover:bg-green-100 text-green-700"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <Package size={40} className="text-gray-300 mb-2" />
                      <p className="mb-1">No containers found</p>
                      <p className="text-sm text-gray-400">Try adjusting your search filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ContainerList;
