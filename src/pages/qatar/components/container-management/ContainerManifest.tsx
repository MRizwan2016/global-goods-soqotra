
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import useContainerManifest from "../../hooks/useContainerManifest";
import ManifestHeader from "./manifest/ManifestHeader";
import CargoSummary from "./manifest/CargoSummary";
import PrintOptionsSelector from "./manifest/PrintOptionsSelector";
import ContainerDetailsSection from "./manifest/ContainerDetailsSection";
import ManifestActionsBar from "./manifest/ManifestActionsBar";
import ManifestTabsHeader from "./manifest/ManifestTabsHeader";
import TabsContentWrapper from "./manifest/TabsContentWrapper";
import PrintContainerManifest from "../print/container/PrintContainerManifest";
import ManifestSkeleton from "./manifest/ManifestSkeleton";
import ManifestError from "./manifest/ManifestError";

interface ContainerManifestProps {
  containerId: string;
  onManifestSubmitted: () => void;
  onCancel: () => void;
}

const ContainerManifest: React.FC<ContainerManifestProps> = ({ 
  containerId, 
  onManifestSubmitted, 
  onCancel 
}) => {
  const {
    container,
    cargoItems,
    confirmDate,
    setConfirmDate,
    vgmWeight,
    setVgmWeight,
    activeTab,
    setActiveTab,
    printViewVisible,
    setPrintViewVisible,
    printOptions,
    setPrintOptions,
    isLoading,
    error,
    totalPackages,
    totalVolume,
    totalWeight,
    itemList,
    consigneeList,
    unsettledInvoices,
    formatVolume,
    formatWeight,
    handleConfirm,
    handlePrint
  } = useContainerManifest(containerId, onManifestSubmitted);
  
  // Add effect to handle cleanup when component unmounts
  useEffect(() => {
    return () => {
      // Remove print-only class from body when component unmounts
      document.body.classList.remove('print-only-manifest');
    };
  }, []);
  
  // Show both print view and regular view when printing
  // This ensures the print view is generated properly while still showing the UI
  if (isLoading) {
    return <ManifestSkeleton />;
  }
  
  // Error state
  if (error || !container) {
    return <ManifestError error={error} onCancel={onCancel} />;
  }
  
  return (
    <>
      {/* Print view - hidden by default in regular view mode, shown when printing */}
      {printViewVisible && container && (
        <div className="print-only" id="container-manifest-print-view">
          <PrintContainerManifest 
            container={container}
            cargoItems={cargoItems}
            itemList={itemList}
            consigneeList={consigneeList}
            unsettledInvoices={unsettledInvoices}
            totalVolume={totalVolume}
            totalWeight={totalWeight}
            totalPackages={totalPackages}
            confirmDate={confirmDate}
            printOptions={printOptions}
          />
        </div>
      )}
      
      {/* Regular view - hidden when printing */}
      <Card className="shadow-md animate-fade-in print:hidden">
        <ManifestHeader 
          containerNumber={container.containerNumber}
          status={container.status}
          onCancel={onCancel}
        />
        
        <CardContent className="p-6">
          <CargoSummary 
            totalPackages={totalPackages}
            totalVolume={totalVolume}
            totalWeight={totalWeight}
            formatVolume={formatVolume}
            formatWeight={formatWeight}
          />
          
          <ContainerDetailsSection 
            container={container}
            confirmDate={confirmDate}
            setConfirmDate={setConfirmDate}
            vgmWeight={vgmWeight}
            setVgmWeight={setVgmWeight}
            totalPackages={totalPackages}
            totalVolume={totalVolume}
            formatVolume={formatVolume}
          />
          
          <PrintOptionsSelector 
            printOptions={printOptions}
            setPrintOptions={setPrintOptions}
          />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <ManifestTabsHeader />
            
            <TabsContentWrapper
              activeTab={activeTab}
              cargoItems={cargoItems}
              itemList={itemList}
              unsettledInvoices={unsettledInvoices}
              consigneeList={consigneeList}
              formatVolume={formatVolume}
              formatWeight={formatWeight}
            />
          </Tabs>
          
          <ManifestActionsBar 
            onCancel={onCancel}
            onConfirm={handleConfirm}
            onPrint={handlePrint}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default ContainerManifest;
