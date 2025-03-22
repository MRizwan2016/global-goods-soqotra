
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box, PackageCheck, Database, FileCheck } from "lucide-react";

const ManifestTabsHeader: React.FC = () => {
  return (
    <TabsList className="grid grid-cols-4 mb-4">
      <TabsTrigger value="cargo" className="flex items-center gap-2">
        <Box size={18} />
        <span>Cargo Items</span>
      </TabsTrigger>
      <TabsTrigger value="items" className="flex items-center gap-2">
        <PackageCheck size={18} />
        <span>Item List</span>
      </TabsTrigger>
      <TabsTrigger value="invoices" className="flex items-center gap-2">
        <Database size={18} />
        <span>Unsettled Invoices</span>
      </TabsTrigger>
      <TabsTrigger value="consignees" className="flex items-center gap-2">
        <FileCheck size={18} />
        <span>Consignee List</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default ManifestTabsHeader;
