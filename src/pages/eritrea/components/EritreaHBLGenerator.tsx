import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, FileText, Printer, Eye } from "lucide-react";
import { toast } from "sonner";
import EritreaHBLDocument from "./EritreaHBLDocument";

interface EritreaInvoice {
  id: string;
  invoiceNumber: string;
  hblNumber?: string;
  shipperName: string;
  shipperAddress: string;
  shipperMobile?: string;
  consigneeName: string;
  consigneeAddress: string;
  consigneeMobile?: string;
  consigneeIdNumber?: string;
  packageItems: any[];
  totalWeight: number;
  totalVolume: number;
  totalPackages: number;
  port: string;
  warehouse: string;
  invoiceDate: string;
}

interface EritreaHBLGeneratorProps {
  onBack: () => void;
}

interface HBLData {
  id: string;
  blNumber: string;
  date: string;
  shipper: {
    name: string;
    address: string;
    phone?: string;
  };
  consignee: {
    name: string;
    address: string;
    idNumber?: string;
  };
  notifyParty?: {
    name: string;
    address: string;
  };
  agent: string;
  carrier: string;
  vessel: string;
  voyage?: string;
  portOfLoading: string;
  portOfDischarge: string;
  finalDestination: string;
  containerNumber: string;
  sealNumber: string;
  cargo: {
    description: string;
    weight: string;
    packages: string;
    marks?: string;
  };
  freightDetails: {
    payable: boolean;
    place: string;
    dateOfIssue: string;
  };
  specialInstructions?: string;
}

const EritreaHBLGenerator: React.FC<EritreaHBLGeneratorProps> = ({ onBack: propOnBack }) => {
  const navigate = useNavigate();
  
  const onBack = () => {
    if (propOnBack) {
      propOnBack();
    } else {
      navigate('/eritrea');
    }
  };
  const [invoices, setInvoices] = useState<EritreaInvoice[]>([]);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<EritreaInvoice | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [hblData, setHblData] = useState<HBLData | null>(null);
  const [hblRoute, setHblRoute] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('route') || 'wrapper';
  });

  // HBL Form fields
  const [vessel, setVessel] = useState("");
  const [voyage, setVoyage] = useState("");
  const [containerNumber, setContainerNumber] = useState("");
  const [sealNumber, setSealNumber] = useState("");
  const [carrier, setCarrier] = useState("Al Maraam Cargo Company");
  const [agent, setAgent] = useState("Al Maraam Cargo Company");
  const [portOfLoading, setPortOfLoading] = useState("Hamad Port, Qatar");
  const [portOfDischarge, setPortOfDischarge] = useState("");
  const [finalDestination, setFinalDestination] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  useEffect(() => {
    // Load invoices from localStorage
    const loadInvoices = () => {
      try {
        const storedInvoices = JSON.parse(localStorage.getItem('eritreaInvoices') || '[]');
        // Show all invoices, but prioritize those with HBL numbers
        setInvoices(storedInvoices);
      } catch (error) {
        console.error("Error loading invoices:", error);
        toast.error("Failed to load invoices");
      }
    };

    loadInvoices();
  }, []);

  useEffect(() => {
    if (selectedInvoiceId) {
      const invoice = invoices.find(inv => inv.id === selectedInvoiceId);
      if (invoice) {
        setSelectedInvoice(invoice);
        // Auto-fill port fields based on invoice
        if (invoice.port === "MUSSAMWA") {
          setPortOfDischarge("Massawa Port, Eritrea");
          setFinalDestination("Massawa, Eritrea");
        } else if (invoice.port === "ASSAB") {
          setPortOfDischarge("Assab Port, Eritrea");
          setFinalDestination("Assab, Eritrea");
        }
      }
    }
  }, [selectedInvoiceId, invoices]);

  const generateCargoDescription = (invoice: EritreaInvoice): string => {
    if (!invoice.packageItems || invoice.packageItems.length === 0) {
      return "Personal Effects and Household Goods";
    }

    const descriptions = invoice.packageItems.map(item => {
      return `${item.quantity} x ${item.name} (${item.length}x${item.width}x${item.height}cm, ${item.weight}kg)`;
    });

    return descriptions.join("\n");
  };

  const handleGenerateHBL = () => {
    if (!selectedInvoice) {
      toast.error("Please select an invoice");
      return;
    }

    if (!vessel || !containerNumber || !sealNumber) {
      toast.error("Please fill in vessel, container, and seal details");
      return;
    }

    const hbl: HBLData = {
      id: `HBL-${selectedInvoice.hblNumber || selectedInvoice.invoiceNumber}`,
      blNumber: selectedInvoice.hblNumber || `HBL-${selectedInvoice.invoiceNumber}`,
      date: new Date().toISOString().split('T')[0],
      shipper: {
        name: selectedInvoice.shipperName,
        address: selectedInvoice.shipperAddress,
        phone: selectedInvoice.shipperMobile
      },
      consignee: {
        name: selectedInvoice.consigneeName,
        address: selectedInvoice.consigneeAddress,
        idNumber: selectedInvoice.consigneeIdNumber
      },
      notifyParty: {
        name: selectedInvoice.consigneeName,
        address: selectedInvoice.consigneeAddress
      },
      agent,
      carrier,
      vessel,
      voyage,
      portOfLoading,
      portOfDischarge,
      finalDestination,
      containerNumber,
      sealNumber,
      cargo: {
        description: generateCargoDescription(selectedInvoice),
        weight: `${selectedInvoice.totalWeight || 0} KGS`,
        packages: `${selectedInvoice.totalPackages || 0} PACKAGES`,
        marks: `INV: ${selectedInvoice.invoiceNumber}`
      },
      freightDetails: {
        payable: true,
        place: "Doha, Qatar",
        dateOfIssue: new Date().toISOString().split('T')[0]
      },
      specialInstructions
    };

    setHblData(hbl);
    setShowPreview(true);
  };

  const handlePrint = () => {
    window.print();
  };

  if (showPreview && hblData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between print:hidden">
          <Button
            variant="outline"
            onClick={() => setShowPreview(false)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Edit
          </Button>
          <div className="flex gap-2">
            <Button onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" />
              Print HBL
            </Button>
          </div>
        </div>
        
        <EritreaHBLDocument hbl={hblData} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Generate House Bill of Lading</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoice Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Select Invoice
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="invoice-select">Choose Invoice with HBL Number</Label>
              <Select value={selectedInvoiceId} onValueChange={setSelectedInvoiceId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an invoice..." />
                </SelectTrigger>
                <SelectContent>
                  {invoices.map((invoice) => (
                    <SelectItem key={invoice.id} value={invoice.id}>
                      {invoice.invoiceNumber} - {invoice.consigneeName} {invoice.hblNumber ? `(HBL: ${invoice.hblNumber})` : '(No HBL)'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedInvoice && (
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">Invoice Details</h4>
                <p><strong>Invoice:</strong> {selectedInvoice.invoiceNumber}</p>
                <p><strong>HBL Number:</strong> {selectedInvoice.hblNumber}</p>
                <p><strong>Date:</strong> {new Date(selectedInvoice.invoiceDate).toLocaleDateString()}</p>
                <p><strong>Consignee:</strong> {selectedInvoice.consigneeName}</p>
                <p><strong>Packages:</strong> {selectedInvoice.totalPackages}</p>
                <p><strong>Weight:</strong> {selectedInvoice.totalWeight} KGS</p>
                <p><strong>Volume:</strong> {selectedInvoice.totalVolume} CBM</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Vessel & Shipping Details */}
        <Card>
          <CardHeader>
            <CardTitle>Vessel & Shipping Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vessel">Vessel Name *</Label>
                <Input
                  id="vessel"
                  value={vessel}
                  onChange={(e) => setVessel(e.target.value)}
                  placeholder="Enter vessel name"
                />
              </div>
              <div>
                <Label htmlFor="voyage">Voyage Number</Label>
                <Input
                  id="voyage"
                  value={voyage}
                  onChange={(e) => setVoyage(e.target.value)}
                  placeholder="Enter voyage number"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="container">Container Number *</Label>
                <Input
                  id="container"
                  value={containerNumber}
                  onChange={(e) => setContainerNumber(e.target.value)}
                  placeholder="Enter container number"
                />
              </div>
              <div>
                <Label htmlFor="seal">Seal Number *</Label>
                <Input
                  id="seal"
                  value={sealNumber}
                  onChange={(e) => setSealNumber(e.target.value)}
                  placeholder="Enter seal number"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="carrier">Carrier</Label>
              <Input
                id="carrier"
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="agent">Agent</Label>
              <Input
                id="agent"
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Port Details */}
        <Card>
          <CardHeader>
            <CardTitle>Port Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="port-loading">Port of Loading</Label>
              <Input
                id="port-loading"
                value={portOfLoading}
                onChange={(e) => setPortOfLoading(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="port-discharge">Port of Discharge</Label>
              <Input
                id="port-discharge"
                value={portOfDischarge}
                onChange={(e) => setPortOfDischarge(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="final-destination">Final Destination</Label>
              <Input
                id="final-destination"
                value={finalDestination}
                onChange={(e) => setFinalDestination(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Special Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="instructions">Special Instructions</Label>
              <Textarea
                id="instructions"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Enter any special instructions..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleGenerateHBL}
          disabled={!selectedInvoice || !vessel || !containerNumber || !sealNumber}
          size="lg"
          className="gap-2"
        >
          <Eye className="h-5 w-5" />
          Preview House Bill of Lading
        </Button>
      </div>
    </div>
  );
};

export default EritreaHBLGenerator;