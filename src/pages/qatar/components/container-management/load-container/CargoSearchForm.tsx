
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Grid } from "@/components/ui/grid";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import { ContainerCargo } from "../../../types/containerTypes";
import { Search, PackageOpen, AlertCircle } from "lucide-react";
import InvoiceSearchInput from "./cargo-search/InvoiceSearchInput";

interface CargoSearchFormProps {
  containerId: string;
  onAddCargo: (cargo: ContainerCargo) => void;
  existingCargo: ContainerCargo[];
}

const CargoSearchForm: React.FC<CargoSearchFormProps> = ({
  containerId,
  onAddCargo,
  existingCargo
}) => {
  // Form state
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [lineNumber, setLineNumber] = useState<string>("");
  const [packageName, setPackageName] = useState<string>("");
  const [volume, setVolume] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [shipper, setShipper] = useState<string>("");
  const [consignee, setConsignee] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [barcode, setBarcode] = useState<string>("");
  
  // Suggestions state
  const [bookingFormSuggestions, setBookingFormSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  
  // Load saved invoices from localStorage for suggestions
  useEffect(() => {
    try {
      const savedInvoices = localStorage.getItem('invoices');
      if (savedInvoices) {
        const parsedInvoices = JSON.parse(savedInvoices);
        
        // Format for suggestions
        const formattedSuggestions = parsedInvoices.map((invoice: any) => ({
          invoiceNumber: invoice.invoiceNumber || invoice.bookingForm || "",
          shipper: invoice.shipperName || "",
          consignee: invoice.consigneeName || "",
          shipperAddress: invoice.shipperAddress || "",
          consigneeAddress: invoice.consigneeAddress || "",
          packages: invoice.packages || [],
          totalVolume: invoice.totalVolume || 0,
          totalWeight: invoice.totalWeight || 0
        }));
        
        setBookingFormSuggestions(formattedSuggestions);
        console.log("Loaded suggestions:", formattedSuggestions.length);
      }
    } catch (error) {
      console.error("Error loading invoice suggestions:", error);
    }
  }, []);
  
  // Handle selecting an invoice from suggestions
  const handleSelectInvoice = (invoice: any) => {
    setInvoiceNumber(invoice.invoiceNumber);
    setShipper(invoice.shipper);
    setConsignee(invoice.consignee);
    
    // Get total volume and weight from packages
    if (invoice.packages && invoice.packages.length > 0) {
      const totalVol = invoice.totalVolume || 
        invoice.packages.reduce((sum: number, pkg: any) => sum + (parseFloat(pkg.volume) || 0), 0);
      
      const totalWgt = invoice.totalWeight || 
        invoice.packages.reduce((sum: number, pkg: any) => sum + (parseFloat(pkg.weight) || 0), 0);
      
      setVolume(totalVol);
      setWeight(totalWgt);
      
      // Set default package name if available
      if (invoice.packages[0]?.packageName) {
        setPackageName(invoice.packages[0].packageName);
      }
      
      // Set quantity to number of packages
      setQuantity(invoice.packages.length);
    }
    
    setShowSuggestions(false);
    toast.success(`Invoice ${invoice.invoiceNumber} selected`);
  };
  
  // Filter suggestions based on input
  const filteredSuggestions = bookingFormSuggestions.filter(invoice => 
    invoice.invoiceNumber.toLowerCase().includes(invoiceNumber.toLowerCase())
  );
  
  // Handle form submission to add cargo
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!invoiceNumber) {
      toast.error("Invoice number is required", {
        icon: <AlertCircle className="h-5 w-5 text-red-500" />
      });
      return;
    }
    
    const newCargo: ContainerCargo = {
      id: uuidv4(),
      containerId,
      invoiceNumber,
      lineNumber,
      packageName: packageName || "Package",
      volume: Number(volume) || 0,
      weight: Number(weight) || 0,
      quantity: Number(quantity) || 1,
      shipper,
      consignee,
      description,
      barcode,
      d2d: false
    };
    
    onAddCargo(newCargo);
    
    // Reset form fields after adding
    setLineNumber("");
    setPackageName("");
    setVolume(0);
    setWeight(0);
    setQuantity(1);
    setDescription("");
    setBarcode("");
  };
  
  // Handle invoice search key press events
  const handleInvoiceKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredSuggestions.length > 0) {
      handleSelectInvoice(filteredSuggestions[0]);
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <InvoiceSearchInput 
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            onKeyPress={handleInvoiceKeyPress}
            bookingFormSuggestions={filteredSuggestions}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            onSelectInvoice={handleSelectInvoice}
          />
          
          <div className="mt-3">
            <Label className="font-bold text-gray-700 mb-1 block">CARGO GROUP/LINE NO.</Label>
            <Input 
              value={lineNumber}
              onChange={(e) => setLineNumber(e.target.value)}
              placeholder="Line number"
            />
          </div>
          
          <div className="mt-3">
            <Label className="font-bold text-gray-700 mb-1 block">SHIPPER:</Label>
            <Input 
              value={shipper}
              onChange={(e) => setShipper(e.target.value)}
              placeholder="Shipper name"
            />
          </div>
          
          <div className="mt-3">
            <Label className="font-bold text-gray-700 mb-1 block">CONSIGNEE:</Label>
            <Input 
              value={consignee}
              onChange={(e) => setConsignee(e.target.value)}
              placeholder="Consignee name"
            />
          </div>
        </div>
        
        <div>
          <div>
            <Label className="font-bold text-gray-700 mb-1 block">PACKAGE TYPE:</Label>
            <Input 
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              placeholder="Box, Carton, etc."
            />
          </div>
          
          <div className="mt-3">
            <Label className="font-bold text-gray-700 mb-1 block">VOLUME (m³):</Label>
            <Input 
              type="number"
              step="0.001"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
            />
          </div>
          
          <div className="mt-3">
            <Label className="font-bold text-gray-700 mb-1 block">WEIGHT (kg):</Label>
            <Input 
              type="number"
              step="0.01"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
          </div>
          
          <div className="mt-3">
            <Label className="font-bold text-gray-700 mb-1 block">QUANTITY:</Label>
            <Input 
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            />
          </div>
        </div>
      </Grid>
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700"
        >
          <PackageOpen className="h-4 w-4 mr-2" />
          Add Cargo to Container
        </Button>
      </div>
    </form>
  );
};

export default CargoSearchForm;
