
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
  const [d2d, setD2d] = useState<boolean>(false);
  const [warehouse, setWarehouse] = useState<string>("");
  
  // Suggestions state
  const [bookingFormSuggestions, setBookingFormSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);
  
  // Load saved invoices from localStorage for suggestions
  useEffect(() => {
    try {
      // Get invoices from localStorage
      const savedInvoices = localStorage.getItem('invoices');
      // Get generated invoices from localStorage
      const generatedInvoices = localStorage.getItem('generatedInvoices');
      
      let allInvoices = [];
      
      // Parse saved invoices if they exist
      if (savedInvoices) {
        const parsedInvoices = JSON.parse(savedInvoices);
        allInvoices = [...parsedInvoices];
      }
      
      // Parse and add generated invoices if they exist
      if (generatedInvoices) {
        const parsedGeneratedInvoices = JSON.parse(generatedInvoices);
        allInvoices = [...allInvoices, ...parsedGeneratedInvoices];
      }
      
      // Format for suggestions
      const formattedSuggestions = allInvoices.map((invoice: any) => ({
        invoiceNumber: invoice.invoiceNumber || invoice.bookingForm || "",
        shipper: invoice.shipper || invoice.shipper1 || "",
        consignee: invoice.consignee || invoice.consignee1 || "",
        shipperAddress: invoice.shipperAddress || "",
        consigneeAddress: invoice.consigneeAddress || "",
        packages: invoice.packages || 0,
        volume: invoice.volume || 0,
        weight: invoice.weight || 0,
        d2d: invoice.d2d || invoice.doorToDoor || false,
        warehouse: invoice.warehouse || "",
        packageName: invoice.packageName || "Box"
      }));
      
      setBookingFormSuggestions(formattedSuggestions);
      console.log("Loaded invoice suggestions:", formattedSuggestions.length);
    } catch (error) {
      console.error("Error loading invoice suggestions:", error);
    }
  }, []);
  
  // Filter suggestions based on input
  useEffect(() => {
    if (invoiceNumber && invoiceNumber.length >= 3) {
      const filtered = bookingFormSuggestions.filter(invoice => 
        invoice.invoiceNumber.toLowerCase().includes(invoiceNumber.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [invoiceNumber, bookingFormSuggestions]);
  
  // Handle selecting an invoice from suggestions
  const handleSelectInvoice = (invoice: any) => {
    setInvoiceNumber(invoice.invoiceNumber);
    setShipper(invoice.shipper);
    setConsignee(invoice.consignee);
    setPackageName(invoice.packageName || "Box");
    setVolume(invoice.volume || 0);
    setWeight(invoice.weight || 0);
    setQuantity(invoice.packages || 1);
    setD2d(invoice.d2d || false);
    setWarehouse(invoice.warehouse || "");
    
    setShowSuggestions(false);
    toast.success(`Invoice ${invoice.invoiceNumber} selected`, {
      description: `Shipper: ${invoice.shipper}, Consignee: ${invoice.consignee}`
    });
  };
  
  // Handle invoice search key press events
  const handleInvoiceKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredSuggestions.length > 0) {
      handleSelectInvoice(filteredSuggestions[0]);
      e.preventDefault();
    }
  };
  
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
      d2d,
      wh: warehouse
    };
    
    onAddCargo(newCargo);
    
    // Reset form fields after adding
    setLineNumber("");
    setBarcode("");
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
          
          <div className="mt-3">
            <Label className="font-bold text-gray-700 mb-1 block">WAREHOUSE:</Label>
            <Input 
              value={warehouse}
              onChange={(e) => setWarehouse(e.target.value)}
              placeholder="Warehouse"
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
          
          <div className="mt-3">
            <Label className="font-bold text-gray-700 mb-1 block">BARCODE:</Label>
            <Input 
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              placeholder="Enter barcode"
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
