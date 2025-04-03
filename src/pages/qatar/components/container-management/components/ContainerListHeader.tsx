
import React from "react";
import { Package } from "lucide-react";
import { motion } from "framer-motion";

interface ContainerListHeaderProps {
  totalContainers: number;
  filteredCount: number;
}

const ContainerListHeader = ({ totalContainers, filteredCount }: ContainerListHeaderProps) => {
  return (
    <motion.div 
      className="px-6 pt-6 pb-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Package size={20} className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Container List</h2>
        </div>
        <div className="text-sm text-gray-500">
          Showing {filteredCount} of {totalContainers} containers
        </div>
      </div>
    </motion.div>
  );
};

export default ContainerListHeader;
