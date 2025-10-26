import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Package, Search, Trash2 } from "lucide-react";
import { AlgeriaContainer } from "../types/algeriaTypes";
import { AlgeriaInvoice } from "../types/algeriaInvoiceTypes";
import { AlgeriaStorageService } from "../services/AlgeriaStorageService";
import { toast } from "sonner";

interface AlgeriaContainerLoadingProps {
  container: AlgeriaContainer;
  onBack: () => void;
}

interface LoadedVehicle {
  exportPlate: string;
  invoice: AlgeriaInvoice;
}

const AlgeriaContainerLoading: React.FC<AlgeriaContainerLoadingProps> = ({
  container,
  onBack
}) => {
  const [exportPlateSearch, setExportPlateSearch] = useState("");
  const [loadedVehicles, setLoadedVehicles] = useState<LoadedVehicle[]>([]);
  const [availableInvoices, setAvailableInvoices] = useState<AlgeriaInvoice[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const invoices = await AlgeriaStorageService.loadInvoices();
    const paidInvoices = invoices.filter(inv => 
      inv.paymentStatus === 'paid' && 
      inv.vehicle?.exportPlate
    );
    setAvailableInvoices(paidInvoices);

    // Load already loaded vehicles for this container
    const loaded = container.loadedVehicles || [];
    const loadedWithInvoices = loaded.map(vehicle => {
      const inv = invoices.find(i => i.vehicle?.exportPlate === vehicle.exportPlate);
      return { exportPlate: vehicle.exportPlate, invoice: inv! };
    }).filter(v => v.invoice);
    
    setLoadedVehicles(loadedWithInvoices);
  };

  const handleLoadVehicle = async () => {
    const plate = exportPlateSearch.trim().toUpperCase();
    if (!plate) {
      toast.error("Please enter an export plate number");
      return;
    }

    // Check if already loaded
    if (loadedVehicles.some(v => v.exportPlate === plate)) {
      toast.error("Vehicle already loaded in this container");
      return;
    }

    // Find invoice with this export plate
    const invoice = availableInvoices.find(inv => 
      inv.vehicle?.exportPlate?.toUpperCase() === plate
    );

    if (!invoice || !invoice.vehicle) {
      toast.error("No paid invoice found with this export plate");
      return;
    }

    // Convert invoice vehicle to AlgeriaVehicle format
    const vehicleToLoad: any = {
      id: invoice.id,
      ...invoice.vehicle,
      customerInfo: {
        name: invoice.customer.name,
        mobile: invoice.customer.mobile,
        address: invoice.customer.address
      }
    };

    // Add to container
    const updatedContainer: AlgeriaContainer = {
      ...container,
      loadedVehicles: [...(container.loadedVehicles || []), vehicleToLoad]
    };

    await AlgeriaStorageService.updateContainer(updatedContainer);
    setLoadedVehicles(prev => [...prev, { exportPlate: plate, invoice }]);
    setExportPlateSearch("");
    toast.success(`Vehicle ${plate} loaded into container`);
  };

  const handleUnloadVehicle = async (exportPlate: string) => {
    const updatedContainer: AlgeriaContainer = {
      ...container,
      loadedVehicles: (container.loadedVehicles || []).filter(v => v.exportPlate !== exportPlate)
    };

    await AlgeriaStorageService.updateContainer(updatedContainer);
    setLoadedVehicles(prev => prev.filter(v => v.exportPlate !== exportPlate));
    toast.success(`Vehicle ${exportPlate} removed from container`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Container Loading</h1>
          <p className="text-sm text-muted-foreground">Container: {container.containerNumber}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Load Vehicle by Export Plate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label>Export Plate Number</Label>
                <Input
                  value={exportPlateSearch}
                  onChange={(e) => setExportPlateSearch(e.target.value.toUpperCase())}
                  placeholder="Enter export plate number"
                  className="uppercase"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleLoadVehicle();
                    }
                  }}
                />
              </div>
              <Button onClick={handleLoadVehicle} className="mt-auto">
                <Search className="h-4 w-4 mr-2" />
                Load Vehicle
              </Button>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Loaded Vehicles ({loadedVehicles.length})</h3>
              {loadedVehicles.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No vehicles loaded yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {loadedVehicles.map((vehicle) => (
                    <Card key={vehicle.exportPlate}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-semibold text-lg mb-1">
                              Export Plate: {vehicle.exportPlate}
                            </div>
                            <div className="text-sm space-y-1">
                              <p>Vehicle: {vehicle.invoice.vehicle?.make} {vehicle.invoice.vehicle?.model}</p>
                              <p>Customer: {vehicle.invoice.customer.name}</p>
                              <p>Invoice: {vehicle.invoice.invoiceNumber}</p>
                              <p>Chassis: {vehicle.invoice.vehicle?.chassisNumber}</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleUnloadVehicle(vehicle.exportPlate)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Container Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Container Number</Label>
              <p className="font-semibold">{container.containerNumber}</p>
            </div>
            <div>
              <Label>Type</Label>
              <p className="font-semibold">{container.type}</p>
            </div>
            <div>
              <Label>Destination Port</Label>
              <p className="font-semibold">{container.portOfDischarge}</p>
            </div>
            <div>
              <Label>Status</Label>
              <p className="font-semibold">{container.status}</p>
            </div>
            <div>
              <Label>Max Vehicles</Label>
              <p className="font-semibold">{container.maxVehicles}</p>
            </div>
            <div>
              <Label>Vehicles Loaded</Label>
              <p className="text-2xl font-bold">{loadedVehicles.length} / {container.maxVehicles}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlgeriaContainerLoading;
