import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, ArrowLeft } from "lucide-react";
import { TunisiaContainer } from "../types/tunisiaTypes";
import { HouseBillOfLading, TunisiaInvoice } from "../types/tunisiaInvoiceTypes";
import HouseBillOfLadingDocument from "./HouseBillOfLadingDocument";
import TunisiaPrintStyles from "./TunisiaPrintStyles";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HouseBillOfLadingGeneratorProps {
  container: TunisiaContainer;
  onBack: () => void;
  invoices?: TunisiaInvoice[];
}

const HouseBillOfLadingGenerator: React.FC<HouseBillOfLadingGeneratorProps> = ({
  container,
  onBack,
  invoices = []
}) => {
  const [selectedInvoiceForBL, setSelectedInvoiceForBL] = useState<TunisiaInvoice | null>(null);
  
  const [hblData, setHblData] = useState<HouseBillOfLading>({
    id: `HBL-${container.id}-${Date.now()}`,
    blNumber: `2025/04726/${Date.now().toString().slice(-5)}`,
    date: new Date().toISOString().split('T')[0],
    shipper: {
      name: "MR. ALGHAMMAM DHAKER",
      address: "DOHA, QATAR",
      phone: ""
    },
    consignee: {
      name: "",
      address: "TUNIS, TUNISIA",
      idNumber: ""
    },
    notifyParty: {
      name: "MR. ALGHAMMAM DHAKER",
      address: "TUNIS, TUNISIA"
    },
    agent: "SOQOTRA LOGISTICS SERVICES AND TRADING",
    carrier: "MAERSK LINE",
    vessel: "SOURCE BLESSING / 531S",
    voyage: "",
    portOfLoading: "HAMAD SEA PORT",
    portOfDischarge: "TUNIS",
    finalDestination: "TUNIS",
    containerNumber: container.containerNumber,
    sealNumber: container.sealNumber,
    cargo: {
      description: generateCargoDescription(),
      weight: "1,450.00KGS",
      packages: "01 X 40' HC (PART) CONTAINER",
      marks: container.containerNumber
    },
    freightDetails: {
      payable: true,
      place: "DOHA, QATAR",
      dateOfIssue: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-')
    },
    specialInstructions: ""
  });

  // Handle invoice selection for auto-filling HBL data
  const handleInvoiceSelection = (invoiceId: string) => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (invoice) {
      setSelectedInvoiceForBL(invoice);
      
      // Auto-fill HBL data from selected invoice
      setHblData(prev => ({
        ...prev,
        consignee: {
          name: `${invoice.customer.prefix} ${invoice.customer.name}`,
          address: invoice.customer.address || "TUNIS, TUNISIA",
          idNumber: invoice.customer.idNumber || ""
        },
        notifyParty: {
          name: `${invoice.customer.prefix} ${invoice.customer.name}`,
          address: invoice.customer.address || "TUNIS, TUNISIA"
        }
      }));
    }
  };

  const [showPreview, setShowPreview] = useState(false);

  function generateCargoDescription(): string {
    const descriptions = [];
    
    // Add vehicles
    container.loadedVehicles.forEach((vehicle, index) => {
      descriptions.push(`${index + 1} UNIT OF ${vehicle.make} ${vehicle.model} STATION WAGON`);
      descriptions.push(`MAKE: ${vehicle.make}`);
      descriptions.push(`MODEL: ${vehicle.model} STATION WAGON`);
      descriptions.push(`MODEL YEAR: ${vehicle.year}`);
      descriptions.push(`CHASSIS NO: ${vehicle.chassisNumber}`);
      if (vehicle.engineNumber) {
        descriptions.push(`ENGINE NO: ${vehicle.engineNumber}`);
      }
      descriptions.push(`CYLINDERS: 4`);
      descriptions.push(`COLOR: ${vehicle.color}`);
      descriptions.push(`${vehicle.country}`);
      if (vehicle.exportPlate) {
        descriptions.push(`EXPORT PLATE: ${vehicle.exportPlate}`);
      }
      descriptions.push(`H.S. CODE: ${vehicle.hsCode}`);
      descriptions.push(`GROSS WEIGHT: 1450 KGS`);
      descriptions.push(""); // Empty line between vehicles
    });

    // Add personal effects
    if (container.personalEffects.length > 0) {
      descriptions.push("PERSONAL EFFECTS & HOUSEHOLD GOODS:");
      container.personalEffects.forEach((effect, index) => {
        descriptions.push(`${index + 1}. ${effect.description.toUpperCase()}`);
        descriptions.push(`QUANTITY: ${effect.quantity}`);
        descriptions.push(`VOLUME: ${effect.volume} CBM`);
      });
    }

    return descriptions.join('\n');
  }

  const handleInputChange = (field: string, value: string, nested?: string) => {
    setHblData(prev => {
      if (nested) {
        return {
          ...prev,
          [nested]: {
            ...(prev[nested as keyof HouseBillOfLading] as any),
            [field]: value
          }
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (showPreview) {
    return (
      <>
        <TunisiaPrintStyles />
        <div className="space-y-4">
          <div className="flex items-center gap-4 print:hidden no-print">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Edit Details
            </Button>
            <Button onClick={handlePrint}>
              <Download className="h-4 w-4 mr-2" />
              Print / Download
            </Button>
          </div>
          <div id="hbl-printable-content" className="print:block">
            <HouseBillOfLadingDocument hbl={hblData} />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Container
        </Button>
        <h1 className="text-2xl font-bold">Generate House Bill of Lading</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shipper Information */}
        <Card>
          <CardHeader>
            <CardTitle>Shipper Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Shipper Name</Label>
              <Input
                value={hblData.shipper.name}
                onChange={(e) => handleInputChange('name', e.target.value, 'shipper')}
              />
            </div>
            <div>
              <Label>Shipper Address</Label>
              <Textarea
                value={hblData.shipper.address}
                onChange={(e) => handleInputChange('address', e.target.value, 'shipper')}
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={hblData.shipper.phone}
                onChange={(e) => handleInputChange('phone', e.target.value, 'shipper')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Invoice Selection for Loading */}
        <Card>
          <CardHeader>
            <CardTitle>Select Invoice for Loading</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Available Invoices</Label>
              <Select onValueChange={handleInvoiceSelection}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an invoice to auto-fill consignee details" />
                </SelectTrigger>
                <SelectContent>
                  {invoices.map((invoice) => (
                    <SelectItem key={invoice.id} value={invoice.id}>
                      {invoice.invoiceNumber} - {invoice.customer.prefix} {invoice.customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {invoices.length === 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  No invoices available. Create invoices first to auto-fill consignee details.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Consignee Information */}
        <Card>
          <CardHeader>
            <CardTitle>Consignee Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Consignee Name</Label>
              <Input
                value={hblData.consignee.name}
                onChange={(e) => handleInputChange('name', e.target.value, 'consignee')}
                placeholder="Enter consignee name"
              />
            </div>
            <div>
              <Label>Consignee Address</Label>
              <Textarea
                value={hblData.consignee.address}
                onChange={(e) => handleInputChange('address', e.target.value, 'consignee')}
              />
            </div>
            <div>
              <Label>ID Number</Label>
              <Input
                value={hblData.consignee.idNumber}
                onChange={(e) => handleInputChange('idNumber', e.target.value, 'consignee')}
                placeholder="Enter ID number"
              />
            </div>
          </CardContent>
        </Card>

        {/* Vessel & Port Information */}
        <Card>
          <CardHeader>
            <CardTitle>Vessel & Port Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Vessel</Label>
              <Input
                value={hblData.vessel}
                onChange={(e) => handleInputChange('vessel', e.target.value)}
              />
            </div>
            <div>
              <Label>Voyage</Label>
              <Input
                value={hblData.voyage}
                onChange={(e) => handleInputChange('voyage', e.target.value)}
              />
            </div>
            <div>
              <Label>Port of Loading</Label>
              <Input
                value={hblData.portOfLoading}
                onChange={(e) => handleInputChange('portOfLoading', e.target.value)}
              />
            </div>
            <div>
              <Label>Port of Discharge</Label>
              <Input
                value={hblData.portOfDischarge}
                onChange={(e) => handleInputChange('portOfDischarge', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Cargo Information */}
        <Card>
          <CardHeader>
            <CardTitle>Cargo Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Container Number</Label>
              <Input
                value={hblData.containerNumber}
                onChange={(e) => handleInputChange('containerNumber', e.target.value)}
                disabled
              />
            </div>
            <div>
              <Label>Seal Number</Label>
              <Input
                value={hblData.sealNumber}
                onChange={(e) => handleInputChange('sealNumber', e.target.value)}
                disabled
              />
            </div>
            <div>
              <Label>Gross Weight</Label>
              <Input
                value={hblData.cargo.weight}
                onChange={(e) => handleInputChange('weight', e.target.value, 'cargo')}
              />
            </div>
            <div>
              <Label>Number of Packages</Label>
              <Input
                value={hblData.cargo.packages}
                onChange={(e) => handleInputChange('packages', e.target.value, 'cargo')}
              />
            </div>
          </CardContent>
        </Card>

        {/* Special Instructions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Special Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={hblData.specialInstructions}
              onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
              placeholder="Enter any special instructions or notes..."
              rows={4}
            />
          </CardContent>
        </Card>
      </div>

      {/* Container Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Container Contents Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Vehicles ({container.loadedVehicles.length})</h4>
              {container.loadedVehicles.map((vehicle, index) => (
                <div key={vehicle.id} className="text-sm border-l-2 border-l-blue-500 pl-4 py-2">
                  <p className="font-medium">{index + 1}. {vehicle.make} {vehicle.model}</p>
                  <p className="text-muted-foreground">
                    {vehicle.year} • {vehicle.color} • Chassis: {vehicle.chassisNumber}
                  </p>
                  {vehicle.customerInfo && (
                    <p className="text-xs text-green-600">
                      Owner: {vehicle.customerInfo.name}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {container.personalEffects.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Personal Effects ({container.personalEffects.length})</h4>
                {container.personalEffects.map((effect, index) => (
                  <div key={effect.id} className="text-sm border-l-2 border-l-green-500 pl-4 py-2">
                    <p className="font-medium">{index + 1}. {effect.description}</p>
                    <p className="text-muted-foreground">
                      Quantity: {effect.quantity} • Volume: {effect.volume} CBM
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <Button onClick={() => setShowPreview(true)} disabled={!hblData.consignee.name}>
          <FileText className="h-4 w-4 mr-2" />
          Preview House Bill of Lading
        </Button>
      </div>
    </div>
  );
};

export default HouseBillOfLadingGenerator;