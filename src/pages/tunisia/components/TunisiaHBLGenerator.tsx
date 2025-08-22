import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, FileText } from "lucide-react";
import { TunisiaInvoice } from "../types/tunisiaInvoiceTypes";
import HouseBillOfLadingGenerator from "./HouseBillOfLadingGenerator";

interface TunisiaHBLGeneratorProps {
  invoices: TunisiaInvoice[];
  onBack: () => void;
}

const TunisiaHBLGenerator: React.FC<TunisiaHBLGeneratorProps> = ({
  invoices,
  onBack
}) => {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>("");
  const [showHBLGenerator, setShowHBLGenerator] = useState(false);

  // Filter invoices that have HBL numbers and are not already processed
  const availableInvoices = invoices.filter(invoice => 
    invoice.hblNumber && invoice.hblNumber.trim() !== ""
  );

  const selectedInvoice = availableInvoices.find(inv => inv.id === selectedInvoiceId);

  const handleGenerateHBL = () => {
    if (selectedInvoice) {
      setShowHBLGenerator(true);
    }
  };

  if (showHBLGenerator && selectedInvoice) {
    // Create a mock container structure for the HBL generator
    const mockContainer = {
      id: selectedInvoice.id,
      containerNumber: `CONTAINER-${selectedInvoice.hblNumber?.replace('/', '-')}`,
      sealNumber: `SEAL-${Date.now()}`,
      type: "40HC" as const,
      maxVehicles: 1,
      loadedVehicles: [{
        id: selectedInvoice.vehicle.chassisNumber,
        type: selectedInvoice.vehicle.type,
        make: selectedInvoice.vehicle.make,
        model: selectedInvoice.vehicle.model,
        year: selectedInvoice.vehicle.year,
        color: selectedInvoice.vehicle.color,
        chassisNumber: selectedInvoice.vehicle.chassisNumber,
        plateNumber: selectedInvoice.vehicle.plateNumber,
        engineNumber: selectedInvoice.vehicle.engineNumber,
        country: selectedInvoice.vehicle.country,
        hsCode: selectedInvoice.vehicle.hsCode,
        exportPlate: selectedInvoice.vehicle.exportPlate,
        photos: selectedInvoice.vehicle.photos,
        freightCharge: selectedInvoice.vehicle.freightCharge,
        loadedAt: new Date().toISOString(),
        customerInfo: selectedInvoice.customer
      }],
      personalEffects: selectedInvoice.personalEffects?.map((effect, index) => ({
        id: `pe-${index}`,
        description: effect.description,
        quantity: effect.quantity,
        volume: effect.volume,
        photos: effect.photos || [],
        hsCode: "9801.00.00",
        charges: effect.charges
      })) || [],
      dateOfLoading: new Date().toISOString().split('T')[0],
      status: "SEALED" as const,
      totalFreightCharge: selectedInvoice.vehicle.freightCharge,
      totalPersonalEffectsCharge: selectedInvoice.personalEffects?.reduce((sum, effect) => sum + effect.charges, 0) || 0,
      totalCharge: selectedInvoice.totalAmount
    };

    return (
      <HouseBillOfLadingGenerator
        container={mockContainer}
        onBack={() => setShowHBLGenerator(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Generate House Bill of Lading</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Select Invoice for HBL Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {availableInvoices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                No invoices with HBL numbers found. Please create invoices with HBL numbers first.
              </p>
              <Button variant="outline" onClick={onBack}>
                Go to Invoice Management
              </Button>
            </div>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Select Invoice by HBL Number
                </label>
                <Select value={selectedInvoiceId} onValueChange={setSelectedInvoiceId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose invoice by HBL number..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableInvoices.map((invoice) => (
                      <SelectItem key={invoice.id} value={invoice.id}>
                        HBL: {invoice.hblNumber} - {invoice.customer.prefix} {invoice.customer.name} - {invoice.vehicle.make} {invoice.vehicle.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedInvoice && (
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Selected Invoice Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div><span className="font-medium">Invoice No:</span> {selectedInvoice.invoiceNumber}</div>
                        <div><span className="font-medium">HBL No:</span> {selectedInvoice.hblNumber}</div>
                        <div><span className="font-medium">Customer:</span> {selectedInvoice.customer.prefix} {selectedInvoice.customer.name}</div>
                        <div><span className="font-medium">Mobile:</span> {selectedInvoice.customer.mobile}</div>
                        {selectedInvoice.customer.metrashMobile && (
                          <div><span className="font-medium">Metrash Mobile:</span> {selectedInvoice.customer.metrashMobile}</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div><span className="font-medium">Vehicle:</span> {selectedInvoice.vehicle.make} {selectedInvoice.vehicle.model}</div>
                        <div><span className="font-medium">Year/Color:</span> {selectedInvoice.vehicle.year} • {selectedInvoice.vehicle.color}</div>
                        <div><span className="font-medium">Chassis:</span> {selectedInvoice.vehicle.chassisNumber}</div>
                        {selectedInvoice.vehicle.exportPlate && (
                          <div><span className="font-medium">Export Plate:</span> {selectedInvoice.vehicle.exportPlate}</div>
                        )}
                        <div><span className="font-medium">Total Amount:</span> QAR {selectedInvoice.totalAmount.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    {selectedInvoice.personalEffects && selectedInvoice.personalEffects.length > 0 && (
                      <div className="mt-4">
                        <div className="font-medium mb-2">Personal Effects:</div>
                        <div className="space-y-1">
                          {selectedInvoice.personalEffects.map((effect, index) => (
                            <div key={index} className="text-xs">
                              • {effect.description} ({effect.quantity} items, {effect.volume} CBM) - QAR {effect.charges.toLocaleString()}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={onBack}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleGenerateHBL} 
                  disabled={!selectedInvoice}
                  className="bg-primary hover:bg-primary/90"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate House Bill of Lading
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {availableInvoices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Available Invoices Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">
                <strong>{availableInvoices.length}</strong> invoice(s) available for HBL generation.
              </p>
              <p>
                Each invoice will generate one House Bill of Lading document containing the customer's vehicle and personal effects details.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TunisiaHBLGenerator;