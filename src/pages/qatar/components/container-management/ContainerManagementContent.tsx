
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import LoadingState from "../shared/LoadingState";
import TabsHeader from "./TabsHeader";
import TabContent from "./TabContent";
import { QatarContainer } from "../../types/containerTypes";
import { PrintOptions } from "../../types/containerTypes";

interface ContainerManagementContentProps {
  isLoading: boolean;
  containers: QatarContainer[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  editContainerId: string | null;
  viewManifestId: string | null;
  printOptions: PrintOptions;
  getCurrentContainer: () => QatarContainer | null;
  getCurrentCargoItems: (containerId: string | null) => any[];
  getItemList: (containerId: string | null) => any[];
  getConsigneeList: (containerId: string | null) => any[];
  getUnsettledInvoices: (containerId: string | null) => any[];
  onEditContainer: (id: string) => void;
  onLoadContainer: (id: string) => void;
  onViewManifest: (id: string) => void;
  onCreateManifest: (id: string) => void;
  onUpdateContainer: (container: QatarContainer) => void;
  onCancelEdit: () => void;
  onLoadComplete: (id: string) => void;
  onManifestSubmitted: (data: any) => void;
  onPrintOptionsChange: (options: Partial<PrintOptions>) => void;
  onPrint: () => void;
  onAddContainer: (container: QatarContainer) => void;
}

const ContainerManagementContent: React.FC<ContainerManagementContentProps> = ({
  isLoading,
  containers,
  activeTab,
  setActiveTab,
  editContainerId,
  viewManifestId,
  printOptions,
  getCurrentContainer,
  getCurrentCargoItems,
  getItemList,
  getConsigneeList,
  getUnsettledInvoices,
  onEditContainer,
  onLoadContainer,
  onViewManifest,
  onCreateManifest,
  onUpdateContainer,
  onCancelEdit,
  onLoadComplete,
  onManifestSubmitted,
  onPrintOptionsChange,
  onPrint,
  onAddContainer
}) => {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoadingState type="container" text="Loading container management data..." />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="no-print shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsHeader activeTab={activeTab} />
            
            <TabContent 
              activeTab={activeTab}
              containers={containers}
              editContainerId={editContainerId}
              viewManifestId={viewManifestId}
              printOptions={printOptions}
              getCurrentContainer={getCurrentContainer}
              getCurrentCargoItems={getCurrentCargoItems}
              getItemList={getItemList}
              getConsigneeList={getConsigneeList}
              getUnsettledInvoices={getUnsettledInvoices}
              onEditContainer={onEditContainer}
              onLoadContainer={onLoadContainer}
              onViewManifest={onViewManifest}
              onCreateManifest={onCreateManifest}
              onUpdateContainer={onUpdateContainer}
              onCancelEdit={onCancelEdit}
              onLoadComplete={onLoadComplete}
              onManifestSubmitted={onManifestSubmitted}
              onPrintOptionsChange={onPrintOptionsChange}
              onPrint={onPrint}
              onAddContainer={onAddContainer}
            />
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContainerManagementContent;
