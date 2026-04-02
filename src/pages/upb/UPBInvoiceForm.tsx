import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Printer } from "lucide-react";
import UPBPackageSelector from "./components/UPBPackageSelector";
import UPBPackageList from "./components/UPBPackageList";
import ManualPackageDialog from "./components/ManualPackageDialog";

interface UPBPackageItem {
  id: string;
  description: string;
  dimensions: string;
  volume: number;
  weight?: number;
  price: number;
  pricingType: 'perKg' | 'perCBM' | 'fixed';
  documentsFee: number;
  total: number;
}

const UPBInvoiceForm = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    customerName: "",
    customerAddress: "",
    date: "",
    destination: "",
    shipperName: "",
    consigneeName: "",
  });

  const [packages, setPackages] = useState<UPBPackageItem[]>([]);
  const [showManualDialog, setShowManualDialog] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      // When shipper name changes, auto-sync consignee to be identical
      if (name === 'shipperName') {
        updated.consigneeName = value;
      }
      // When customer name changes, sync both shipper and consignee
      if (name === 'customerName') {
        updated.shipperName = value;
        updated.consigneeName = value;
      }
      return updated;
    });
  };

  const handleAddPackage = (packageItem: UPBPackageItem) => {
    setPackages(prev => [...prev, packageItem]);
  };

  const handleRemovePackage = (id: string) => {
    setPackages(prev => prev.filter(pkg => pkg.id !== id));
  };

  const calculateTotals = () => {
    const totalVolume = packages.reduce((sum, pkg) => sum + pkg.volume, 0);
    const totalWeight = packages.reduce((sum, pkg) => sum + (pkg.weight || 0), 0);
    const totalPrice = packages.reduce((sum, pkg) => sum + pkg.price, 0);
    const totalDocsFee = packages.reduce((sum, pkg) => sum + pkg.documentsFee, 0);
    const grandTotal = packages.reduce((sum, pkg) => sum + pkg.total, 0);

    return { totalVolume, totalWeight, totalPrice, totalDocsFee, grandTotal };
  };

  const totals = calculateTotals();

  return (
    <div className="container mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl text-soqotra-blue">UPB Invoice Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleInputChange}
                placeholder="Enter invoice number"
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="Enter destination"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="customerAddress">Customer Address</Label>
            <Textarea
              id="customerAddress"
              name="customerAddress"
              value={formData.customerAddress}
              onChange={handleInputChange}
              placeholder="Enter customer address"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Package Details</CardTitle>
        </CardHeader>
        <CardContent>
          <UPBPackageSelector onAddPackage={handleAddPackage} />
          <div className="mt-4">
            <Button 
              onClick={() => setShowManualDialog(true)}
              variant="outline"
              className="mb-4"
            >
              Add Manual Package
            </Button>
          </div>
          <UPBPackageList 
            packages={packages} 
            onRemovePackage={handleRemovePackage} 
          />
        </CardContent>
      </Card>

      {packages.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <p className="font-medium">Total Volume</p>
                <p>{totals.totalVolume.toFixed(3)} CBM</p>
              </div>
              <div>
                <p className="font-medium">Total Weight</p>
                <p>{totals.totalWeight.toFixed(2)} KG</p>
              </div>
              <div>
                <p className="font-medium">Total Price</p>
                <p>QAR {totals.totalPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="font-medium">Docs Fee</p>
                <p>QAR {totals.totalDocsFee.toFixed(2)}</p>
              </div>
              <div>
                <p className="font-medium text-lg">Grand Total</p>
                <p className="text-lg font-bold">QAR {totals.grandTotal.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        <Button className="bg-soqotra-blue hover:bg-soqotra-blue/90">
          <Save className="h-4 w-4 mr-2" />
          Save Invoice
        </Button>
        <Button variant="outline">
          <Printer className="h-4 w-4 mr-2" />
          Print Invoice
        </Button>
      </div>

      <ManualPackageDialog
        open={showManualDialog}
        onOpenChange={setShowManualDialog}
        onAddPackage={handleAddPackage}
      />
    </div>
  );
};

export default UPBInvoiceForm;