import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ContainerCargo } from "../../../types/containerTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Package, Plus, Barcode, Search } from "lucide-react";
import useBarcodeScanner from "../../../hooks/useBarcodeScanner";

interface CargoLoaderProps {
  containerId: string;
  onAddCargo: (cargo: ContainerCargo) => void;
}

const CargoLoader: React.FC<CargoLoaderProps> = ({ containerId, onAddCargo }) => {
  const [cargoForm, setCargoForm] = useState({
    invoiceNumber: "",
    lineNumber: "",
    barcode: "",
    packageName: "",
    volume: "",
    weight: "",
    shipper: "",
    consignee: "",
    wh: "WH001",
    d2d: false,
    quantity: "1"
  });

  const [invoiceList, setInvoiceList] = useState<any[]>([]);
  
  useEffect(() => {
    try {
      const savedInvoices = localStorage.getItem('invoices');
      const generatedInvoices = localStorage.getItem('generatedInvoices');
      
      let allInvoices = [];
      
      if (savedInvoices) {
        const parsedInvoices = JSON.parse(savedInvoices);
        allInvoices = [...parsedInvoices];
      }
      
      if (generatedInvoices) {
        const parsedGeneratedInvoices = JSON.parse(generatedInvoices);
        allInvoices = [...allInvoices, ...parsedGeneratedInvoices];
      }
      
      setInvoiceList(allInvoices);
      console.log(`Loaded ${allInvoices.length} invoices for barcode lookup`);
    } catch (error) {
      console.error("Error loading invoices for barcode lookup:", error);
    }
  }, []);

  const handleInvoiceBarcodeDetected = (invoiceNumber: string) => {
    const invoice = invoiceList.find(inv => 
      inv.invoiceNumber === invoiceNumber || 
      inv.invoiceNumber === `GY${invoiceNumber}` ||
      inv.invoiceNumber === `${invoiceNumber}`
    );
    
    if (invoice) {
      setCargoForm(prev => ({
        ...prev,
        invoiceNumber: invoice.invoiceNumber,
        shipper: invoice.shipper || invoice.shipper1 || "",
        consignee: invoice.consignee || invoice.consignee1 || "",
        packageName: invoice.packageName || "Box",
        volume: invoice.volume?.toString() || "0",
        weight: invoice.weight?.toString() || "0",
        d2d: invoice.d2d || invoice.doorToDoor || false,
        wh: invoice.warehouse || prev.wh
      }));
      
      toast.success(`Invoice ${invoice.invoiceNumber} loaded`, {
        description: `${invoice.shipper || invoice.shipper1} → ${invoice.consignee || invoice.consignee1}`
      });
    } else {
      setCargoForm(prev => ({
        ...prev,
        invoiceNumber
      }));
      
      toast.warning(`Invoice ${invoiceNumber} not found in system`, {
        description: "Only invoice number has been set"
      });
    }
  };
  
  const handlePackageBarcodeDetected = (barcode: string) => {
    setCargoForm(prev => ({
      ...prev,
      barcode
    }));
    
    toast.info(`Package barcode scanned: ${barcode}`);
  };

  const { scanning, toggleScanning } = useBarcodeScanner({
    onBarcodeDetected: handlePackageBarcodeDetected,
    onInvoiceBarcodeDetected: handleInvoiceBarcodeDetected,
    enabled: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCargoForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleAddCargo = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cargoForm.invoiceNumber || !cargoForm.packageName || !cargoForm.volume || !cargoForm.weight) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const newCargo: ContainerCargo = {
      id: uuidv4(),
      containerId: containerId,
      invoiceNumber: cargoForm.invoiceNumber,
      lineNumber: cargoForm.lineNumber || `LN${Math.floor(1000 + Math.random() * 9000)}`,
      barcode: cargoForm.barcode || `BC${Math.floor(100000000 + Math.random() * 900000000)}`,
      packageName: cargoForm.packageName,
      volume: parseFloat(cargoForm.volume) || 0,
      weight: parseFloat(cargoForm.weight) || 0,
      shipper: cargoForm.shipper,
      consignee: cargoForm.consignee,
      wh: cargoForm.wh,
      d2d: cargoForm.d2d,
      quantity: parseInt(cargoForm.quantity) || 1
    };
    
    onAddCargo(newCargo);
    
    setCargoForm(prev => ({
      ...prev,
      barcode: "",
      lineNumber: ""
    }));
    
    toast.success("Cargo added successfully");
  };

  const findInvoiceByNumber = () => {
    if (!cargoForm.invoiceNumber) {
      toast.warning("Enter an invoice number to search");
      return;
    }

    const invoice = invoiceList.find(inv => 
      inv.invoiceNumber === cargoForm.invoiceNumber || 
      inv.invoiceNumber === `GY${cargoForm.invoiceNumber}` ||
      inv.invoiceNumber === `${cargoForm.invoiceNumber}`
    );
    
    if (invoice) {
      setCargoForm(prev => ({
        ...prev,
        shipper: invoice.shipper || invoice.shipper1 || "",
        consignee: invoice.consignee || invoice.consignee1 || "",
        packageName: invoice.packageName || "Box",
        volume: invoice.volume?.toString() || "0",
        weight: invoice.weight?.toString() || "0",
        d2d: invoice.d2d || invoice.doorToDoor || false,
        wh: invoice.warehouse || prev.wh
      }));
      
      toast.success(`Invoice ${invoice.invoiceNumber} found`);
    } else {
      toast.error("Invoice not found in system");
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-lg flex items-center">
          <Package className="mr-2" size={18} />
          Quick Cargo Entry
        </CardTitle>
        <Button 
          onClick={toggleScanning} 
          variant={scanning ? "default" : "outline"} 
          size="sm"
          className={scanning ? "bg-green-600 hover:bg-green-700" : ""}
        >
          <Barcode className="mr-2 h-4 w-4" />
          {scanning ? "Scanner Active" : "Start Scanner"}
        </Button>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleAddCargo} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Label htmlFor="invoiceNumber">Invoice Number*</Label>
              <div className="flex">
                <Input
                  id="invoiceNumber"
                  name="invoiceNumber"
                  value={cargoForm.invoiceNumber}
                  onChange={handleChange}
                  placeholder="e.g. 13135619"
                  required
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="ml-1" 
                  onClick={findInvoiceByNumber}
                  title="Look up invoice"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="lineNumber">Line Number</Label>
              <Input
                id="lineNumber"
                name="lineNumber"
                value={cargoForm.lineNumber}
                onChange={handleChange}
                placeholder="e.g. LN001"
              />
            </div>
            
            <div>
              <Label htmlFor="barcode">Barcode</Label>
              <Input
                id="barcode"
                name="barcode"
                value={cargoForm.barcode}
                onChange={handleChange}
                placeholder="e.g. BC123456789"
              />
            </div>
            
            <div>
              <Label htmlFor="packageName">Package Name*</Label>
              <Input
                id="packageName"
                name="packageName"
                value={cargoForm.packageName}
                onChange={handleChange}
                placeholder="e.g. Electronics"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="volume">Volume (m³)*</Label>
              <Input
                id="volume"
                name="volume"
                type="number"
                step="0.001"
                value={cargoForm.volume}
                onChange={handleChange}
                placeholder="e.g. 1.5"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="weight">Weight (kg)*</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                step="0.01"
                value={cargoForm.weight}
                onChange={handleChange}
                placeholder="e.g. 250"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="quantity">Quantity*</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                step="1"
                value={cargoForm.quantity}
                onChange={handleChange}
                placeholder="e.g. 1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="shipper">Shipper</Label>
              <Input
                id="shipper"
                name="shipper"
                value={cargoForm.shipper}
                onChange={handleChange}
                placeholder="e.g. ABC Company"
              />
            </div>
            
            <div>
              <Label htmlFor="consignee">Consignee</Label>
              <Input
                id="consignee"
                name="consignee"
                value={cargoForm.consignee}
                onChange={handleChange}
                placeholder="e.g. XYZ Company"
              />
            </div>
            
            <div>
              <Label htmlFor="wh">Warehouse</Label>
              <Input
                id="wh"
                name="wh"
                value={cargoForm.wh}
                onChange={handleChange}
                placeholder="e.g. WH001"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="d2d"
                name="d2d"
                checked={cargoForm.d2d}
                onCheckedChange={(checked) => {
                  setCargoForm(prev => ({
                    ...prev,
                    d2d: checked
                  }));
                }}
              />
              <Label htmlFor="d2d">Door-to-Door Delivery</Label>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus size={16} />
              Add Cargo
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CargoLoader;
