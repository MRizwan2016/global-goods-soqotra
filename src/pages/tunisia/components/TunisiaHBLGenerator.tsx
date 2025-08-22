import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, FileText, Printer } from "lucide-react";
import { TunisiaInvoice } from "../types/tunisiaInvoiceTypes";
// import HouseBillOfLadingGenerator from "./HouseBillOfLadingGenerator";

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
  const [showPreview, setShowPreview] = useState(false);
  const [hblData, setHblData] = useState({
    consigneeName: "",
    consigneeAddress: "TUNIS, TUNISIA",
    vessel: "SOURCE BLESSING / 531S",
    blNumber: "",
    specialInstructions: ""
  });

  // Filter invoices that have HBL numbers and are not already processed
  const availableInvoices = invoices.filter(invoice => 
    invoice.hblNumber && invoice.hblNumber.trim() !== ""
  );

  const selectedInvoice = availableInvoices.find(inv => inv.id === selectedInvoiceId);

  const handleGenerateHBL = () => {
    if (selectedInvoice) {
      setHblData(prev => ({
        ...prev,
        blNumber: selectedInvoice.hblNumber || `2025/${Date.now().toString().slice(-6)}`,
        consigneeName: `${selectedInvoice.customer.prefix} ${selectedInvoice.customer.name}`
      }));
      setShowHBLGenerator(true);
    }
  };

  const handlePrint = () => {
    window.print();
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

    if (showPreview) {
      return (
        <div className="space-y-4">
          <div className="flex gap-4 print:hidden">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Edit Details
            </Button>
            <Button onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print HBL
            </Button>
          </div>

          {/* House Bill of Lading Document */}
          <div className="max-w-4xl mx-auto p-8 bg-white print:p-0 print:m-0 border rounded-lg print:border-0">
            <div className="border-2 border-black">
              {/* Header */}
              <div className="p-4 border-b border-black text-center">
                <h1 className="text-xl font-bold">HOUSE BILL OF LADING</h1>
                <p className="text-sm">NON-NEGOTIABLE</p>
                <div className="mt-2 text-right">
                  <p className="font-bold">B/L No: {hblData.blNumber}</p>
                </div>
              </div>

              {/* Company Info */}
              <div className="p-4 border-b border-black text-center bg-green-50">
                <h2 className="text-lg font-bold text-green-600">SOQOTRA LOGISTICS SERVICES AND TRADING</h2>
                <p className="text-xs">Office 3, 1st Floor, Building: 53, Street 76, Azzia Commercial Street</p>
                <p className="text-xs">P.O. Box: 55561, Al Aziziyah, Doha, State of Qatar</p>
              </div>

              {/* Customer & Vehicle Details */}
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-4 border-r border-black">
                  <h3 className="font-bold mb-2">Shipper</h3>
                  <p className="font-semibold">MR. ALGHAMMAM DHAKER</p>
                  <p>DOHA, QATAR</p>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">Consignee</h3>
                  <p className="font-semibold">{hblData.consigneeName}</p>
                  <p>{hblData.consigneeAddress}</p>
                  <p>Mobile: {selectedInvoice.customer.mobile}</p>
                  {selectedInvoice.customer.metrashMobile && (
                    <p>Metrash: {selectedInvoice.customer.metrashMobile}</p>
                  )}
                </div>
              </div>

              {/* Vessel Information */}
              <div className="grid grid-cols-2 border-b border-black">
                <div className="p-4 border-r border-black">
                  <h3 className="font-bold mb-2">Vessel</h3>
                  <p>{hblData.vessel}</p>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">Port of Loading / Discharge</h3>
                  <p>HAMAD SEA PORT / TUNIS</p>
                </div>
              </div>

              {/* Cargo Description */}
              <div className="p-4 border-b border-black">
                <h3 className="font-bold mb-2">Description of Goods</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>1 UNIT OF {selectedInvoice.vehicle.make} {selectedInvoice.vehicle.model}</strong></p>
                  <p>MAKE: {selectedInvoice.vehicle.make}</p>
                  <p>MODEL: {selectedInvoice.vehicle.model}</p>
                  <p>MODEL YEAR: {selectedInvoice.vehicle.year}</p>
                  <p>CHASSIS NO: {selectedInvoice.vehicle.chassisNumber}</p>
                  {selectedInvoice.vehicle.engineNumber && (
                    <p>ENGINE NO: {selectedInvoice.vehicle.engineNumber}</p>
                  )}
                  <p>COLOR: {selectedInvoice.vehicle.color}</p>
                  <p>{selectedInvoice.vehicle.country}</p>
                  {selectedInvoice.vehicle.exportPlate && (
                    <p>EXPORT PLATE: {selectedInvoice.vehicle.exportPlate}</p>
                  )}
                  <p>H.S. CODE: {selectedInvoice.vehicle.hsCode}</p>
                  
                  {selectedInvoice.personalEffects && selectedInvoice.personalEffects.length > 0 && (
                    <div className="mt-4">
                      <p><strong>PERSONAL EFFECTS & HOUSEHOLD GOODS:</strong></p>
                      {selectedInvoice.personalEffects.map((effect, index) => (
                        <div key={index}>
                          <p>{index + 1}. {effect.description.toUpperCase()}</p>
                          <p>QUANTITY: {effect.quantity}</p>
                          <p>VOLUME: {effect.volume} CBM</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Weight and Measurement */}
              <div className="grid grid-cols-3 border-b border-black text-sm">
                <div className="p-4 border-r border-black">
                  <h3 className="font-bold">Packages</h3>
                  <p>01 X 40' HC CONTAINER</p>
                </div>
                <div className="p-4 border-r border-black">
                  <h3 className="font-bold">Gross Weight</h3>
                  <p>1,450.00 KGS</p>
                </div>
                <div className="p-4">
                  <h3 className="font-bold">Measurement</h3>
                  <p>1 CBM</p>
                </div>
              </div>

              {/* Special Instructions */}
              {hblData.specialInstructions && (
                <div className="p-4 border-b border-black">
                  <h3 className="font-bold mb-2">Special Instructions</h3>
                  <p className="text-sm">{hblData.specialInstructions}</p>
                </div>
              )}

              {/* Footer */}
              <div className="p-4 text-xs">
                <p><strong>Freight Payable at:</strong> DOHA, QATAR</p>
                <p><strong>Place and Date of Issue:</strong> DOHA, QATAR, {new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}</p>
                <div className="mt-4 text-center">
                  <p>This Bill of Lading is issued subject to the terms and conditions printed overleaf.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setShowHBLGenerator(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Selection
          </Button>
          <h1 className="text-2xl font-bold">Generate House Bill of Lading</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Consignee Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Consignee Name</Label>
                <Input
                  value={hblData.consigneeName}
                  onChange={(e) => setHblData(prev => ({ ...prev, consigneeName: e.target.value }))}
                  placeholder="Enter consignee name"
                />
              </div>
              <div>
                <Label>Consignee Address</Label>
                <Textarea
                  value={hblData.consigneeAddress}
                  onChange={(e) => setHblData(prev => ({ ...prev, consigneeAddress: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>B/L Number</Label>
                <Input
                  value={hblData.blNumber}
                  onChange={(e) => setHblData(prev => ({ ...prev, blNumber: e.target.value }))}
                  placeholder="House B/L Number"
                />
              </div>
              <div>
                <Label>Vessel</Label>
                <Input
                  value={hblData.vessel}
                  onChange={(e) => setHblData(prev => ({ ...prev, vessel: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Special Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={hblData.specialInstructions}
                onChange={(e) => setHblData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                placeholder="Enter any special instructions..."
                rows={4}
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Invoice Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div><strong>Invoice:</strong> {selectedInvoice.invoiceNumber}</div>
                <div><strong>Customer:</strong> {selectedInvoice.customer.prefix} {selectedInvoice.customer.name}</div>
                <div><strong>Mobile:</strong> {selectedInvoice.customer.mobile}</div>
                {selectedInvoice.customer.metrashMobile && (
                  <div><strong>Metrash:</strong> {selectedInvoice.customer.metrashMobile}</div>
                )}
              </div>
              <div className="space-y-2">
                <div><strong>Vehicle:</strong> {selectedInvoice.vehicle.make} {selectedInvoice.vehicle.model}</div>
                <div><strong>Year/Color:</strong> {selectedInvoice.vehicle.year} • {selectedInvoice.vehicle.color}</div>
                <div><strong>Chassis:</strong> {selectedInvoice.vehicle.chassisNumber}</div>
                <div><strong>Total:</strong> QAR {selectedInvoice.totalAmount.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setShowHBLGenerator(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => setShowPreview(true)} 
            disabled={!hblData.consigneeName}
            className="bg-primary hover:bg-primary/90"
          >
            <FileText className="h-4 w-4 mr-2" />
            Preview House Bill of Lading
          </Button>
        </div>
      </div>
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