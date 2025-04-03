
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, PlusCircle, Settings, FileCheck, Package2, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface TabsHeaderProps {
  activeTab: string;
}

const TabsHeader: React.FC<TabsHeaderProps> = ({ activeTab }) => {
  // Animation variants
  const tabVariants = {
    inactive: { scale: 1, backgroundColor: "rgba(255, 255, 255, 0.5)" },
    active: (color: string) => ({ 
      scale: 1.05, 
      backgroundColor: color,
      transition: { type: "spring", stiffness: 300, damping: 15 }
    })
  };

  return (
    <TabsList className="grid grid-cols-5 mb-8 bg-gradient-to-r from-gray-100 to-white p-1 rounded-lg">
      <motion.div
        initial="inactive"
        animate={activeTab === "containers" ? "active" : "inactive"}
        variants={tabVariants}
        custom="rgba(59, 130, 246, 0.9)"
        className="rounded-md"
      >
        <TabsTrigger 
          value="containers" 
          className="w-full data-[state=active]:bg-transparent data-[state=active]:text-white uppercase font-semibold"
        >
          <Package className="mr-2 h-4 w-4" />
          <span>CONTAINERS</span>
        </TabsTrigger>
      </motion.div>
      
      <motion.div
        initial="inactive"
        animate={activeTab === "add" ? "active" : "inactive"}
        variants={tabVariants}
        custom="rgba(34, 197, 94, 0.9)"
        className="rounded-md"
      >
        <TabsTrigger 
          value="add" 
          className="w-full data-[state=active]:bg-transparent data-[state=active]:text-white uppercase font-semibold"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          <span>ADD NEW</span>
        </TabsTrigger>
      </motion.div>
      
      <motion.div
        initial="inactive"
        animate={activeTab === "edit" ? "active" : "inactive"}
        variants={tabVariants}
        custom="rgba(234, 88, 12, 0.9)"
        className="rounded-md"
      >
        <TabsTrigger 
          value="edit" 
          className="w-full data-[state=active]:bg-transparent data-[state=active]:text-white uppercase font-semibold"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>EDIT</span>
        </TabsTrigger>
      </motion.div>
      
      <motion.div
        initial="inactive"
        animate={activeTab === "load" ? "active" : "inactive"}
        variants={tabVariants}
        custom="rgba(168, 85, 247, 0.9)"
        className="rounded-md"
      >
        <TabsTrigger 
          value="load" 
          className="w-full data-[state=active]:bg-transparent data-[state=active]:text-white uppercase font-semibold"
        >
          <Package2 className="mr-2 h-4 w-4" />
          <span>LOAD</span>
        </TabsTrigger>
      </motion.div>
      
      <motion.div
        initial="inactive"
        animate={activeTab === "manifest" || activeTab === "view-manifest" ? "active" : "inactive"}
        variants={tabVariants}
        custom="rgba(20, 184, 166, 0.9)"
        className="rounded-md"
      >
        <TabsTrigger 
          value={activeTab === "view-manifest" ? "view-manifest" : "manifest"} 
          className="w-full data-[state=active]:bg-transparent data-[state=active]:text-white uppercase font-semibold"
        >
          <FileText className="mr-2 h-4 w-4" />
          <span>MANIFEST</span>
        </TabsTrigger>
      </motion.div>
    </TabsList>
  );
};

export default TabsHeader;
