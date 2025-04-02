
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QatarContainer, ContainerCargo } from "../../types/containerTypes";
import { ArrowLeft, Package, Truck, Search, FileText, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import ContainerDetailsSection from "./load-container/ContainerDetailsSection";
import CargoSearchForm from "./load-container/CargoSearchForm";
import CargoTable from "./load-container/CargoTable";
import CargoLoader from "./load-container/CargoLoader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LoadContainerDetailsProps {
  containerId: string;
  containerData?: QatarContainer | null;
  onLoadComplete: () => void;
  onCancel: () => void;
}

const LoadContainerDetails: React.FC<LoadContainerDetailsProps> = ({
  containerId,
  containerData,
  onLoadComplete,
  onCancel,
}) => {
  // State to track loaded cargo items
  const [cargoItems, setCargoItems] = useState<ContainerCargo[]>([]);
  const [activeTab, setActiveTab] = useState<string>("advancedSearch"); // Default to invoice search now
  const [loadedInvoiceNumbers, setLoadedInvoiceNumbers] = useState<Set<string>>(new Set());
  
  // Load existing cargo items for this container
  useEffect(() => {
    const savedCargoItems = JSON.parse(localStorage.getItem('cargoItems') || '[]');
    const containerCargo = savedCargoItems.filter((item: any) => item.containerId === containerId);
    
    setCargoItems(containerCargo);
    
    // Track which invoice numbers are already loaded
    const invoiceNumbers = new Set<string>();
    containerCargo.forEach((item: ContainerCargo) => {
      invoiceNumbers.add(item.invoiceNumber);
    });
    setLoadedInvoiceNumbers(invoiceNumbers);
    
    console.log(`Loaded ${containerCargo.length} cargo items for container ${containerId}`);
  }, [containerId]);
  
  // Handle adding cargo to the container
  const handleAddCargo = (cargo: ContainerCargo) => {
    // Check for duplicate package (same invoice + barcode)
    const isDuplicate = cargoItems.some(item => 
      item.invoiceNumber === cargo.invoiceNumber && 
      item.barcode === cargo.barcode && 
      cargo.barcode !== ""
    );
    
    if (isDuplicate) {
      toast.error("This package is already loaded in the container", {
        description: "Each package can only be loaded once",
        icon: <AlertCircle className="h-5 w-5 text-red-500" />
      });
      return;
    }
    
    // Add to state
    const updatedItems = [...cargoItems, cargo];
    setCargoItems(updatedItems);
    
    // Update loaded invoice numbers
    setLoadedInvoiceNumbers(prev => new Set([...prev, cargo.invoiceNumber]));
    
    toast.success(`Cargo item added to container`, {
      description: `Invoice: ${cargo.invoiceNumber}, ${cargo.packageName}`
    });
  };
  
  // Handle removing cargo from the container
  const handleRemoveCargo = (cargoId: string) => {
    // Find the cargo to be removed
    const cargoToRemove = cargoItems.find(item => item.id === cargoId);
    if (!cargoToRemove) return;
    
    // Update state
    const updatedItems = cargoItems.filter(item => item.id !== cargoId);
    setCargoItems(updatedItems);
    
    // Check if this was the last item for this invoice
    const hasMoreItemsWithSameInvoice = updatedItems.some(item => 
      item.invoiceNumber === cargoToRemove.invoiceNumber
    );
    
    // If no more items with this invoice, remove from loaded invoices
    if (!hasMoreItemsWithSameInvoice) {
      const updatedInvoiceNumbers = new Set(loadedInvoiceNumbers);
      updatedInvoiceNumbers.delete(cargoToRemove.invoiceNumber);
      setLoadedInvoiceNumbers(updatedInvoiceNumbers);
    }
    
    toast.info(`Cargo item removed`);
  };
  
  // Complete loading and proceed
  const handleLoadComplete = () => {
    // Save cargo items to localStorage
    const savedCargoItems = JSON.parse(localStorage.getItem('cargoItems') || '[]');
    
    // Remove existing items for this container
    const filteredItems = savedCargoItems.filter((item: any) => item.containerId !== containerId);
    
    // Add current items
    const updatedCargoItems = [...filteredItems, ...cargoItems];
    localStorage.setItem('cargoItems', JSON.stringify(updatedCargoItems));
    
    // Proceed to manifest
    onLoadComplete();
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={onCancel} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">
          Load Container: {containerData?.containerNumber || containerId}
        </h2>
      </div>

      {containerData && (
        <ContainerDetailsSection container={containerData} onContainerChange={() => {}} />
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid grid-cols-2 mb-4 w-full max-w-md">
          <TabsTrigger value="advancedSearch" className="flex items-center">
            <Search className="mr-2 h-4 w-4" />
            Invoice Search
          </TabsTrigger>
          <TabsTrigger value="quickLoad" className="flex items-center">
            <Package className="mr-2 h-4 w-4" />
            Quick Load
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="advancedSearch">
          <Card>
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Invoice Search
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <CargoSearchForm 
                containerId={containerId} 
                onAddCargo={handleAddCargo}
                existingCargo={cargoItems}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quickLoad">
          <CargoLoader 
            containerId={containerId} 
            onAddCargo={handleAddCargo} 
          />
        </TabsContent>
      </Tabs>

      {cargoItems.length > 0 && (
        <Card className="mt-6 mb-6">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-lg flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Cargo Items ({cargoItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <CargoTable 
              cargoItems={cargoItems} 
              onRemoveCargo={handleRemoveCargo}
            />
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button 
          onClick={handleLoadComplete} 
          className="bg-blue-600 hover:bg-blue-700"
          disabled={cargoItems.length === 0}
        >
          <Truck className="h-4 w-4 mr-2" />
          Proceed to Manifest
        </Button>
      </div>
    </div>
  );
};

export default LoadContainerDetails;
